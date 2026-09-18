import { getAllModules, moduleParam } from "@/lib/content";
import { Marquee } from "@/components/Marquee";
import { HeroSection } from "@/components/home/HeroSection";
import { WhySection } from "@/components/home/WhySection";
import { PromptSliderSection } from "@/components/home/PromptSliderSection";
import { HowItWorksSection } from "@/components/home/HowItWorksSection";
import { SignupBand } from "@/components/home/SignupBand";
import { BentoSection } from "@/components/home/BentoSection";
import { ModuleRailSection, type RailModule } from "@/components/home/ModuleRailSection";
import { AudienceSection } from "@/components/home/AudienceSection";
import { AuthorSection } from "@/components/home/AuthorSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FaqSection } from "@/components/home/FaqSection";
import { SubscribeSection } from "@/components/home/SubscribeSection";
import { BuySection } from "@/components/home/BuySection";

export default function Home() {
  const modules = getAllModules();
  const totalModules = modules.length;
  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);
  const moduleTitles = modules.map((m) => m.title);

  const railModules: RailModule[] = modules.map((m) => ({
    number: m.module,
    href: `/${moduleParam(m.module)}`,
    title: m.title,
    description: m.subtitle,
    lessonCount: m.lessons.length,
  }));

  const marqueeItems = modules.map((m) => ({
    index: String(m.module).padStart(2, "0"),
    label: m.title,
  }));

  return (
    <main>
      <HeroSection totalLessons={totalLessons} totalModules={totalModules} moduleTitles={moduleTitles} />
      <Marquee items={marqueeItems} />
      <WhySection totalLessons={totalLessons} />
      <PromptSliderSection totalLessons={totalLessons} />
      <HowItWorksSection />
      <SignupBand />
      <BentoSection />
      <ModuleRailSection modules={railModules} />
      <AudienceSection />
      <AuthorSection />
      <TestimonialsSection />
      <FaqSection />
      <SubscribeSection />
      <BuySection />
    </main>
  );
}
