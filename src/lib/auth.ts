import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { admin } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI as string);
const db = client.db("aura_artifact");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }, request) => {
      try {
        const response = await fetch("http://localhost:5000/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            to: user.email,
            subject: "Reset your password - Aura & Artifact",
            html: `
              <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; background: #fafafa; padding: 32px; border-radius: 12px; border: 1px solid #eaeaea;">
                <h2 style="color: #18181b; margin-top: 0;">Reset Your Password</h2>
                <p style="color: #52525b; line-height: 1.6;">Hi ${user.name},</p>
                <p style="color: #52525b; line-height: 1.6;">You recently requested to reset your password for your Aura & Artifact account. You can use the verification code below to reset your password:</p>
                
                <div style="background: #ffffff; padding: 16px 24px; border-radius: 8px; border: 1px dashed #d4d4d8; margin: 24px 0; text-align: center;">
                  <span style="font-family: monospace; font-size: 20px; font-weight: bold; color: #18181b; letter-spacing: 1px;">${token}</span>
                </div>
                
                <p style="color: #52525b; line-height: 1.6;">Alternatively, you can click the button below:</p>
                <a href="${url}" style="display: inline-block; padding: 12px 24px; background-color: #09090b; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 500;">Reset Password Directly</a>
                
                <p style="color: #71717a; font-size: 14px; margin-top: 32px; line-height: 1.5;">If you did not request a password reset, please safely ignore this email.</p>
              </div>
            `,
          }),
        });
        
        if (!response.ok) {
          console.error("Failed to send email via backend API:", await response.text());
        } else {
          console.log("Email sent successfully via backend API!");
        }
      } catch (err) {
        console.error("Error connecting to backend API to send email:", err);
      }

    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_SECRET_ID as string,
    }
  },
  advanced: {
    cookiePrefix: "aura",
  },
  plugins: [
    admin()
  ]
});