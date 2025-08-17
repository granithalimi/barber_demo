import { UpdatePasswordForm } from "@/components/update-password-form";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10 bg-gradient-to-tl from-gray-900 to-gray-600">
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="w-full max-w-sm z-10">
        <UpdatePasswordForm />
      </div>
    </div>
  );
}
