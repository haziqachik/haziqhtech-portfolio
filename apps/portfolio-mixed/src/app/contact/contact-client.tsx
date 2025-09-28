"use client";

import { useState } from "react";
import { z } from "zod";
import { motion } from "framer-motion";

import emailjs from "@emailjs/browser";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const emailConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? "",
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? "",
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? "",
};

const formSchema = z.object({
  name: z.string().min(2, "Please share your name."),
  email: z.string().email("Use a valid email so I can reply."),
  message: z.string().min(10, "Share a little more context (10+ characters)."),
});

interface ContactClientProps {
  email: string;
  endpoint: string | null;
}

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 },
};

export default function ContactClient({ email, endpoint }: ContactClientProps) {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState<string>("");


  const submitWithEmailJs = async () => {
    if (!emailConfig.serviceId || !emailConfig.templateId || !emailConfig.publicKey) {
      return false;
    }

    try {
      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
          to_email: email,
        },
        {
          publicKey: emailConfig.publicKey,
        },
      );
      return true;
    } catch (error) {
      console.error("EmailJS error", error);
      return false;
    }
  };

  const handleChange = (field: "name" | "email" | "message") =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
      setErrors((prev) => ({ ...prev, [field]: "" }));
    };

  const submitToFormspree = async () => {
    if (!endpoint) return false;
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error("Request failed");
      }
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = formSchema.safeParse(formData);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const path = issue.path[0];
        if (path) {
          fieldErrors[path as string] = issue.message;
        }
      });
      setErrors(fieldErrors);
      setStatus("error");
      setStatusMessage("Please fix the highlighted fields and try again.");
      return;
    }

    setStatus("loading");
    setStatusMessage("Sending your message...");

    const viaEmailJs = await submitWithEmailJs();
    if (viaEmailJs) {
      setStatus("success");
      setStatusMessage("Thanks! Your note just landed in my inbox.");
      setFormData({ name: "", email: "", message: "" });
      return;
    }

    const sent = await submitToFormspree();
    if (sent) {
      setStatus("success");
      setStatusMessage("Thanks! Your note is on its way.");
      setFormData({ name: "", email: "", message: "" });
      return;
    }

    const subject = encodeURIComponent(`Message from ${formData.name}`);
    const body = encodeURIComponent(`${formData.message}\n\nReply to: ${formData.email}`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;

    setStatus("success");
    setStatusMessage("Opened your mail client so you can finish sending the message.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={fadeIn}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="mx-auto flex w-full max-w-3xl flex-col gap-8"
    >
      <div className="space-y-4 text-center">
        <Badge variant="secondary" className="mx-auto w-fit">
          Contact
        </Badge>
        <div className="space-y-2">
          <h1 className="text-4xl font-semibold tracking-tight">Let&apos;s start a conversation</h1>
          <p className="text-sm text-muted-foreground md:text-base">
            Use the form below or email me directly at {" "}
            <a href={`mailto:${email}`} className="font-medium text-primary hover:underline">
              {email}
            </a>
            .
          </p>
        </div>
      </div>

      <Card className="border-border/70 bg-card/90">
        <CardHeader>
          <CardTitle className="text-xl">Share a few details</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            I aim to respond within two working days.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-5" noValidate onSubmit={handleSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-semibold">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange("name")}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "name-error" : undefined}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm shadow-soft-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="Your name"
                />
                {errors.name ? (
                  <p id="name-error" className="text-xs font-medium text-destructive">
                    {errors.name}
                  </p>
                ) : null}
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-semibold">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange("email")}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? "email-error" : undefined}
                  className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm shadow-soft-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
                  placeholder="you@example.com"
                />
                {errors.email ? (
                  <p id="email-error" className="text-xs font-medium text-destructive">
                    {errors.email}
                  </p>
                ) : null}
              </div>
            </div>
            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-semibold">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                value={formData.message}
                onChange={handleChange("message")}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? "message-error" : undefined}
                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm shadow-soft-sm transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring"
                placeholder="How can I help?"
              />
              {errors.message ? (
                <p id="message-error" className="text-xs font-medium text-destructive">
                  {errors.message}
                </p>
              ) : null}
            </div>
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <Button type="submit" size="lg" disabled={status === "loading"}>
                {status === "loading" ? "Sending..." : "Send message"}
              </Button>
              {statusMessage ? (
                <span className="text-xs text-muted-foreground md:text-sm" role="status" aria-live="polite">
                  {statusMessage}
                </span>
              ) : null}
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.section>
  );
}