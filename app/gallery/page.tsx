import Header from "@/components/header/header";
import { montserrat } from "@/fonts/font";

export default function Page() {
  return (
    <main className="bg-gradient-to-tl from-gray-900 to-gray-800 min-h-screen">
      <Header />
      <div className="w-full h-20 bg-transparent"></div>
      <h1 className={`${montserrat.className} text-xl text-center text-white`}>Gallery comming soon...</h1>
    </main>
  );
}
