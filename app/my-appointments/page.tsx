import Header from "@/components/header/header";

export default async function Page() {
  return (
    <main className="bg-gradient-to-tl from-gray-900 to-gray-800 min-h-screen">
      <Header />
      <div className="w-full h-20 bg-transparent"></div>
      <h1 className="text-center">Welcome in my apps</h1>
    </main>
  );
}
