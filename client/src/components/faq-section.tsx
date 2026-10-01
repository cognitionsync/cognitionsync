import SectionHeading from "@/components/primitives/section-heading";
import Reveal from "@/components/primitives/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { siteConfig } from "@config";

const { faq } = siteConfig;

export default function FaqSection() {
  return (
    <section id="faq" className="section-py">
      <div className="container-page">
        <SectionHeading eyebrow={faq.eyebrow} title={faq.title} align="center" />

        <Reveal className="mx-auto mt-12 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faq.items.map((f, i) => (
              <AccordionItem key={i} value={`item-${i}`} className="border-border">
                <AccordionTrigger className="py-5 text-left text-base font-medium text-foreground no-underline hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-[0.95rem] leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
