import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  message: z.string().trim().min(1).max(4000),
  subject: z.string().trim().max(140).optional(),
});

const escapeHtml = (text: string) =>
  text.replace(
    /[&<>"']/g,
    (char) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;",
      })[char] || char,
  );

export const sendContactEmail = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    const apiKey = process.env["RESEND_API_KEY"];
    if (!apiKey) throw new Error("Email is not configured");

    const safeName = escapeHtml(data.name);
    const safeEmail = escapeHtml(data.email);
    const safeMessage = escapeHtml(data.message).replace(/\n/g, "<br>");
    const subject = data.subject?.trim() || `New portfolio message from ${safeName}`;

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["santoshskv2005@gmail.com"],
        reply_to: data.email,
        subject,
        html: `
          <div style="font-family: -apple-system, Segoe UI, Arial, sans-serif; max-width: 600px; margin: 0 auto; background:#ffffff; color:#0a0a0a; padding:32px; border:1px solid #e5e7eb; border-radius:12px;">
            <h1 style="margin:0 0 16px; font-size:20px; font-weight:600;">${escapeHtml(subject)}</h1>
            <table style="width:100%; border-collapse:collapse; margin-bottom:20px;">
              <tr><td style="padding:8px 0; color:#6b7280; width:80px; font-size:13px;">Name</td><td style="padding:8px 0; font-size:14px;">${safeName}</td></tr>
              <tr><td style="padding:8px 0; color:#6b7280; font-size:13px;">Email</td><td style="padding:8px 0; font-size:14px;"><a href="mailto:${safeEmail}" style="color:#2563eb; text-decoration:none;">${safeEmail}</a></td></tr>
            </table>
            <div style="background:#f9fafb; border:1px solid #e5e7eb; border-radius:8px; padding:16px;">
              <p style="margin:0; line-height:1.6; font-size:14px; white-space:pre-wrap;">${safeMessage}</p>
            </div>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      console.error("Resend API error", res.status, await res.text());
      throw new Error("Unable to send message at this time. Please try again later.");
    }

    return { success: true as const };
  });
