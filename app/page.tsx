import Collaborator from "@/components/Collaborator";
import EBTExplanation from "@/components/EBTExplanation";
import EBTImplementation from "@/components/EBTImplementation";
import Footer from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import Hero from "@/components/Hero";
import Module from "@/components/Module";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Collaborator />
      <EBTExplanation />
      <EBTImplementation />
      <Module />
      <Gallery />
      <Footer />
    </>
  );
}
