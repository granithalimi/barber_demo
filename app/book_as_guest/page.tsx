import Footer from "@/components/footer";
import Gcalendar from "@/components/gcalendar";
import Header from "@/components/header/header";
import { poppins } from "@/fonts/font";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (data?.user) {
    redirect("/book");
  }

  return (
    <main className="bg-gradient-to-tl from-gray-900 to-gray-800 min-h-screen">
      <Header />
      <div className="w-full h-20 bg-transparent"></div>

      {/* Text */}
      <div className="w-[350px] mx-auto mt-10">
        <h1 className={`${poppins.className} text-gray-500`}>
          <span className={`text-lg mb-2 text-white`}>
            Book an Appointment as a Guest
          </span>
          <br /> You&apos;re currently booking an appointment as a guest. For a
          faster checkout, access to your booking history, and a more
          personalized experience, we recommend{" "}
          <Link href={"/auth/login"} className="underline text-white">
            logging in
          </Link>{" "}
          or{" "}
          <Link href={"/auth/sign-up"} className="underline text-white">
            creating an account.
          </Link>
        </h1>
      </div>

      <Gcalendar />
      <Footer />
    </main>
  );
}
