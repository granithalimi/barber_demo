import Header from "@/components/header/header";
import HeadSection from "@/components/head-section";
import Services from "@/components/services";
import About from "@/components/about";
import Footer from "@/components/footer";
import Gallery from "@/components/gallery";

export default async function Home() {
  return (
    <main>
      <Header />
      <HeadSection />
      <Services />
      <About />
      <Gallery />
      <Footer />
    </main>
  );
}
