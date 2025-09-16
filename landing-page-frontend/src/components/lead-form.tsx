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

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { toast } from "sonner";
import { cn } from "@/lib/utils";

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
type SubmitState = "idle" | "loading" | "ok" | "error";

export default function LeadForm() {
  const [status, setStatus] = useState<SubmitState>("idle");
  const [msg, setMsg] = useState<string>("");

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: { fullName: "", email: "", phone: "" },
    mode: "onBlur",
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

      const json = (await res.json()) as unknown;

      if (!res.ok) {
        const errMsg =
          typeof json === "object" &&
          json !== null &&
          "error" in json &&
          typeof (json as { error: unknown }).error === "string"
            ? (json as { error: string }).error
            : "Submit failed.";
        setStatus("error");
        setMsg(errMsg);
        toast.error("Submission failed", { description: errMsg });
        return;
      }

      const id =
        typeof json === "object" &&
        json !== null &&
        "id" in json &&
        typeof (json as { id: unknown }).id === "number"
          ? String((json as { id: number }).id)
          : "N/A";

      setStatus("ok");
      setMsg(`Saved! Record ID: ${id}`);
      toast.success("Submitted successfully", {
        description: `Saved! Record ID: ${id}`,
      });
      form.reset({ fullName: "", email: "", phone: "" });
    } catch (e: unknown) {
      const message = e instanceof Error ? e.message : "Network error.";
      setStatus("error");
      setMsg(message);
      toast.error("Submission error", { description: message });
    }
  }

  const submitting = status === "loading";

  return (
    <Card className="border-muted/40 shadow-sm">
      {/* <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Get in touch</CardTitle>
        <CardDescription>
          Leave your contact and we will reach out.
        </CardDescription>
      </CardHeader> */}
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Jane Doe"
                      {...field}
                      className={cn("h-11")}
                    />
                  </FormControl>
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
                      className={cn("h-11")}
                    />
                  </FormControl>
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
                      className={cn("h-11")}
                    />
                  </FormControl>
                  {/* <FormDescription>Optional.</FormDescription> */}
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={submitting}
              aria-busy={submitting}
            >
              {submitting ? "Submitting…" : "Submit"}
            </Button>

            {/* Debugging part of submitted status */}
            {/* {status !== "idle" && (
              <p
                className={cn(
                  "text-sm",
                  status === "ok" && "text-green-600",
                  status === "error" && "text-red-600",
                )}
                aria-live="polite"
              >
                {msg}
              </p>
            )} */}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
