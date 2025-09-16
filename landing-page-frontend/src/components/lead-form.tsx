"use client";

import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const FormSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Full Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z
    .string()
    .max(20, { message: "Phone number is too long." })
    .optional()
    .or(z.literal("")),
});

type FormValues = z.infer<typeof FormSchema>;

export default function LeadForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );
  const [msg, setMsg] = useState<string>("");

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { fullName: "", email: "", phone: "" },
  });

  async function onSubmit(values: FormValues) {
    try {
      setStatus("loading");
      setMsg("");
      const res = await fetch("/api/form/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      if (!res.ok) {
        setStatus("error");
        setMsg(json?.error ?? "Submit failed.");
        return;
      }
      setStatus("ok");
      setMsg(`Saved! Record ID: ${json.id ?? "N/A"}`);
      form.reset();
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Network error.";
      setStatus("error");
      setMsg(message);
    }
  }

  const submitting = status === "loading";

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Jane Doe" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your legal or preferred full name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="jane@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    We will only use it to contact you.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="+353 XX XXX XXXX"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>Optional.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              size="lg"
              className="text-base"
              disabled={submitting}
            >
              {submitting ? "Submitting…" : "Submit"}
            </Button>

            {status !== "idle" && (
              <p
                className={`text-sm ${
                  status === "ok"
                    ? "text-green-600"
                    : status === "error"
                      ? "text-red-600"
                      : ""
                }`}
                aria-live="polite"
              >
                {msg}
              </p>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
