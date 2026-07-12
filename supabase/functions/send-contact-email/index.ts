import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  message: string;
}

const escapeHtml = (text: string) =>
  text.replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[char] || char));

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, message }: ContactEmailRequest = await req.json();

    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const trimmedName = String(name).trim();
    const trimmedEmail = String(email).trim();
    const trimmedMessage = String(message).trim();

    if (
      trimmedName.length === 0 || trimmedName.length > 100 ||
      trimmedMessage.length === 0 || trimmedMessage.length > 2000 ||
      trimmedEmail.length > 255 || !emailRegex.test(trimmedEmail)
    ) {
      return new Response(
        JSON.stringify({ error: "Invalid input" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const safeName = escapeHtml(trimmedName);
    const safeEmail = escapeHtml(trimmedEmail);
    const safeMessage = escapeHtml(trimmedMessage).replace(/\n/g, "<br>");

    const notificationRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["santoshskv2005@gmail.com"],
        reply_to: trimmedEmail,
        subject: `New portfolio message from ${safeName}`,
        html: `
          <div style="font-family: -apple-system, Segoe UI, Arial, sans-serif; max-width: 600px; margin: 0 auto; background:#ffffff; color:#0a0a0a; padding:32px; border:1px solid #e5e7eb; border-radius:12px;">
            <h1 style="margin:0 0 16px; font-size:20px; font-weight:600; color:#0a0a0a;">New portfolio message</h1>
            <p style="margin:0 0 24px; color:#6b7280; font-size:14px;">You received a new message from your portfolio contact form.</p>
            <table style="width:100%; border-collapse:collapse; margin-bottom:20px;">
              <tr><td style="padding:8px 0; color:#6b7280; width:80px; font-size:13px;">Name</td><td style="padding:8px 0; color:#0a0a0a; font-size:14px;">${safeName}</td></tr>
              <tr><td style="padding:8px 0; color:#6b7280; font-size:13px;">Email</td><td style="padding:8px 0; font-size:14px;"><a href="mailto:${safeEmail}" style="color:#2563eb; text-decoration:none;">${safeEmail}</a></td></tr>
            </table>
            <div style="background:#f9fafb; border:1px solid #e5e7eb; border-radius:8px; padding:16px;">
              <div style="color:#6b7280; font-size:12px; text-transform:uppercase; letter-spacing:0.08em; margin-bottom:8px;">Message</div>
              <p style="margin:0; line-height:1.6; color:#0a0a0a; font-size:14px; white-space:pre-wrap;">${safeMessage}</p>
            </div>
            <p style="color:#9ca3af; font-size:12px; margin-top:24px;">Reply directly to this email to respond to ${safeName}.</p>
          </div>
        `,
      }),
    });

    if (!notificationRes.ok) {
      const errorText = await notificationRes.text();
      console.error("Resend API error:", {
        status: notificationRes.status,
        statusText: notificationRes.statusText,
        body: errorText,
        timestamp: new Date().toISOString(),
      });
      return new Response(
        JSON.stringify({ error: "Unable to send message at this time. Please try again later." }),
        { status: 502, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, message: "Message sent successfully!" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", {
      message: error?.message,
      stack: error?.stack,
      timestamp: new Date().toISOString(),
    });
    return new Response(
      JSON.stringify({ error: "Unable to send message at this time. Please try again later." }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);
