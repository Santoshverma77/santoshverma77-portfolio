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

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, message }: ContactEmailRequest = await req.json();
    
    console.log("Received contact form submission:", { name, email, message: message.substring(0, 50) + "..." });

    // Validate input
    if (!name || !email || !message) {
      console.error("Missing required fields");
      return new Response(
        JSON.stringify({ error: "All fields are required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Send notification email to you using Resend API
    const notificationRes = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Portfolio Contact <onboarding@resend.dev>",
        to: ["santoshskv2005@gmail.com"],
        subject: `🍃 New Message from ${name}`,
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a1a2e 0%, #0f0f1a 100%); color: #fff; padding: 30px; border-radius: 15px;">
            <h1 style="color: #f97316; border-bottom: 2px solid #f97316; padding-bottom: 10px;">🍥 New Contact Form Submission</h1>
            <div style="background: rgba(249, 115, 22, 0.1); padding: 20px; border-radius: 10px; margin: 20px 0;">
              <p style="margin: 10px 0;"><strong style="color: #f97316;">👤 Name:</strong> ${name}</p>
              <p style="margin: 10px 0;"><strong style="color: #f97316;">📧 Email:</strong> <a href="mailto:${email}" style="color: #60a5fa;">${email}</a></p>
            </div>
            <div style="background: rgba(96, 165, 250, 0.1); padding: 20px; border-radius: 10px;">
              <p style="color: #f97316; margin-bottom: 10px;"><strong>💬 Message:</strong></p>
              <p style="line-height: 1.6;">${message.replace(/\n/g, '<br>')}</p>
            </div>
            <p style="color: #888; font-size: 12px; margin-top: 20px; text-align: center;">"Believe it! 信じろ!" 🍥</p>
          </div>
        `,
      }),
    });

    if (!notificationRes.ok) {
      const error = await notificationRes.text();
      console.error("Failed to send notification email:", error);
      throw new Error(`Failed to send email: ${error}`);
    }

    console.log("Notification email sent successfully to santoshskv2005@gmail.com");

    return new Response(
      JSON.stringify({ success: true, message: "Message sent successfully!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
