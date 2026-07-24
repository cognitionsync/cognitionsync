import SectionHeading from "@/components/primitives/section-heading";
import Reveal from "@/components/primitives/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Who owns the IP and outputs?",
    a: "You do — fully. We retain no rights to what we build for you.",
  },
  {
    q: "Do you use our data to train your own models?",
    a: "No. Your data stays yours and is never used outside your engagement.",
  },
  {
    q: "Which AI models do you use?",
    a: "We're model-agnostic. We recommend based on your use case, cost profile, and compliance needs — not vendor preference.",
  },
  {
    q: "How long does a typical engagement take?",
    a: "Sprints run 4–10 weeks. Embedded engagements usually show results within the first 30 days.",
  },
  {
    q: "Can you integrate with our existing stack?",
    a: "Yes. We assess your environment during the Scope phase and design integration into the plan from day one.",
  },
  {
    q: "What happens when the engagement ends?",
    a: "We hand off with documentation and a runbook your team can operate independently. No lock-in.",
  },
  {
    q: "How do you handle data security?",
    a: "We work within your security perimeter, sign NDAs and DPAs before any data is shared, and follow SOC 2-aligned practices.",
  },
];

export default function FaqSection() {
  return (
    <section id="faq" className="section-py">
      <div className="container-page">
        <SectionHeading eyebrow="FAQ" title="Questions we hear often" align="center" />

        <Reveal className="mx-auto mt-12 max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
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
