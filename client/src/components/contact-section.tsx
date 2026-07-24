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
import { siteConfig } from "@config";

const { contact, contactInfo } = siteConfig;
const f = contact.form;

const schema = z.object({
  name: z.string().min(2, f.validation.nameMin),
  email: z.string().email(f.validation.emailInvalid),
  company: z.string().optional(),
  message: z.string().min(10, f.validation.messageMin),
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
      toast({ title: f.successTitle, description: f.successDescription });
      form.reset();
    } catch {
      toast({
        title: f.errorTitle,
        description: `${f.errorDescriptionPrefix} ${contactInfo.email}`,
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
            <span className="eyebrow justify-center">{contact.eyebrow}</span>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              {contact.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              {contact.subtitle}
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="mx-auto mt-12 max-w-xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>{f.nameLabel}</FormLabel>
                    <FormControl><Input placeholder={f.namePlaceholder} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                <FormField control={form.control} name="email" render={({ field }) => (
                  <FormItem>
                    <FormLabel>{f.emailLabel}</FormLabel>
                    <FormControl><Input type="email" placeholder={f.emailPlaceholder} {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
              </div>
              <FormField control={form.control} name="company" render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    {f.companyLabel}{" "}
                    <span className="text-muted-foreground">{f.companyOptionalSuffix}</span>
                  </FormLabel>
                  <FormControl><Input placeholder={f.companyPlaceholder} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="message" render={({ field }) => (
                <FormItem>
                  <FormLabel>{f.messageLabel}</FormLabel>
                  <FormControl>
                    <Textarea rows={4} placeholder={f.messagePlaceholder} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground transition-colors duration-150 hover:bg-brand-hover disabled:opacity-60"
              >
                {submitting ? f.submittingLabel : f.submitLabel}
              </button>
            </form>
          </Form>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 text-sm text-muted-foreground sm:flex-row sm:gap-8">
            <a href={`mailto:${contactInfo.email}`} className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
              <Mail className="h-4 w-4" strokeWidth={1.5} /> {contactInfo.email}
            </a>
            <a href={contactInfo.calendarUrl} className="inline-flex items-center gap-2 transition-colors hover:text-foreground">
              <CalendarClock className="h-4 w-4" strokeWidth={1.5} /> {contact.calendarLabel}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
