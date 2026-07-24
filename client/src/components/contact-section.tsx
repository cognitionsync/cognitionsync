import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Mail, CalendarClock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import Reveal from "@/components/primitives/reveal";
import { useToast } from "@/hooks/use-toast";

const schema = z.object({
  name: z.string().min(2, "Please enter your name"),
  email: z.string().email("Enter a valid work email"),
  company: z.string().optional(),
  message: z.string().min(10, "Tell us a little more (10+ characters)"),
});
type FormData = z.infer<typeof schema>;

export default function ContactSection() {
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", company: "", message: "" },
  });

  const onSubmit = async (_data: FormData) => {
    setSubmitting(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      toast({ title: "Message sent.", description: "We'll reply within one business day." });
      form.reset();
    } catch {
      toast({
        title: "Something went wrong",
        description: "Email us directly at hello@cognitionsync.ai",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-py border-t border-border">
      <div className="container-page">
        <div className="mx-auto max-w-xl text-center">
          <Reveal>
            <span className="eyebrow justify-center">Contact</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Let's build something that works.
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              Tell us what you're working on. No obligation, no sales runaround — just a straight
              conversation about whether we can help.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mx-auto mt-12 max-w-xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl><Input placeholder="Your name" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Work email</FormLabel>
                    <FormControl><Input type="email" placeholder="you@company.com" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <FormField control={form.control} name="company" render={({ field }) => (
                <FormItem>
                  <FormLabel>Company <span className="text-muted-foreground">(optional)</span></FormLabel>
                  <FormControl><Input placeholder="Company" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="message" render={({ field }) => (
                <FormItem>
                  <FormLabel>What are you working on?</FormLabel>
                  <FormControl>
                    <Textarea rows={4} placeholder="A sentence or two about your goal is plenty." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors duration-150 hover:bg-brand-hover disabled:opacity-60"
              >
                {submitting ? "Sending…" : "Send message"}
              </button>
            </form>
          </Form>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 text-sm text-muted-foreground sm:flex-row sm:gap-8">
            <a href="mailto:hello@cognitionsync.ai" className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
              <Mail className="h-4 w-4" strokeWidth={1.5} /> hello@cognitionsync.ai
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
              <CalendarClock className="h-4 w-4" strokeWidth={1.5} /> Book a 30-min call
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
