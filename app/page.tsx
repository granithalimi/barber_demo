import Header from "@/components/header/header";
import HeadSection from "@/components/head-section";
import Services from "@/components/services";
import About from "@/components/about";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <main>
      <Header />
      <HeadSection />
      <Services />
      <About />
      <Footer />
    </main>
  );
}
