import { createClient } from "@/lib/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("user_id", user.id)
      .single();

    if (profileError || profile?.role !== "admin") {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const formData = await request.formData();
    const files = formData.getAll("images") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files provided" }, { status: 400 });
    }

    const uploadResults = [];

    for (const file of files) {
      if (!file.type.startsWith("image/")) {
        uploadResults.push({
          filename: file.name,
          success: false,
          error: "Invalid file type",
        });
        continue;
      }

      // Generate unique filename
      const timestamp = Date.now();
      const fileExtension = file.name.split(".").pop();
      const filename = `${timestamp}_${Math.random()
        .toString(36)
        .substring(2)}.${fileExtension}`;

      // Convert file to buffer
      const buffer = Buffer.from(await file.arrayBuffer());

      // Upload to Supabase storage
      const { error } = await supabase.storage
        .from("gallery")
        .upload(filename, buffer, {
          contentType: file.type,
          upsert: false,
        });

      if (error) {
        uploadResults.push({
          filename: file.name,
          success: false,
          error: error.message,
        });
      } else {
        uploadResults.push({
          filename: file.name,
          success: true,
          uploadedAs: filename,
        });
      }
    }

    const successCount = uploadResults.filter((r) => r.success).length;
    const failureCount = uploadResults.filter((r) => !r.success).length;

    return NextResponse.json({
      message: `Uploaded ${successCount} files successfully${
        failureCount > 0 ? `, ${failureCount} failed` : ""
      }`,
      results: uploadResults,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
