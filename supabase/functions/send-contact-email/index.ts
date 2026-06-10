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
        subject: `🍃 New Message from ${safeName}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%); color: #fff; padding: 30px; border-radius: 15px;">
            <h1 style="color: #f97316; border-bottom: 2px solid #f97316; padding-bottom: 10px;">🍥 New Contact Form Submission</h1>
            <div style="background: rgba(249, 115, 22, 0.1); padding: 20px; border-radius: 10px; margin: 20px 0;">
              <p style="margin: 10px 0;"><strong style="color: #f97316;">👤 Name:</strong> ${safeName}</p>
              <p style="margin: 10px 0;"><strong style="color: #f97316;">📧 Email:</strong> <a href="mailto:${safeEmail}" style="color: #60a5fa;">${safeEmail}</a></p>
            </div>
            <div style="background: rgba(96, 165, 250, 0.1); padding: 20px; border-radius: 10px;">
              <p style="color: #f97316; margin-bottom: 10px;"><strong>💬 Message:</strong></p>
              <p style="line-height: 1.6;">${safeMessage}</p>
            </div>
            <p style="color: #888; font-size: 12px; margin-top: 20px; text-align: center;">"Believe it! 信じろ!" 🍥</p>
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
