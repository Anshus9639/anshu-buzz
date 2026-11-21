import { Hero } from "@/components/sections/Hero";
import { Work } from "@/components/sections/Work";
import { About } from "@/components/sections/About";
import { Expertise } from "@/components/sections/Expertise";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Work />
      <About />
      <Expertise />
      <Experience />
      <Contact />
    </>
  );
}
