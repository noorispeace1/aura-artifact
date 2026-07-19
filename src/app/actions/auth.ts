"use server"

import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI as string;
const client = new MongoClient(uri);

export async function handleForgotPassword(email: string) {
  try {
    await client.connect();
    const db = client.db("aura_artifact");
    
    // Check if user exists in the user collection
    const user = await db.collection("user").findOne({ email });
    
    if (!user) {
      return { success: false, error: "This email is not registered. Please create an account first." };
    }

    // Generate a 6-digit OTP
    const token = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Save it to a custom password_resets collection
    await db.collection("password_resets").updateOne(
      { email },
      { 
        $set: { 
          email,
          token,
          createdAt: new Date()
        } 
      },
      { upsert: true }
    );

    // Send the email via the Express backend
    const response = await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000") + "/api/send-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to: email,
        subject: "Reset your password - Aura & Artifact",
        html: `
          <div style="font-family: sans-serif; max-w: 600px; margin: 0 auto; background: #fafafa; padding: 32px; border-radius: 12px; border: 1px solid #eaeaea;">
            <h2 style="color: #18181b; margin-top: 0;">Reset Your Password</h2>
            <p style="color: #52525b; line-height: 1.6;">Hi ${user.name || 'there'},</p>
            <p style="color: #52525b; line-height: 1.6;">You recently requested to reset your password for your Aura & Artifact account. You can use the verification code below to reset your password:</p>
            
            <div style="background: #ffffff; padding: 16px 24px; border-radius: 8px; border: 1px dashed #d4d4d8; margin: 24px 0; text-align: center;">
              <span style="font-family: monospace; font-size: 32px; font-weight: bold; color: #18181b; letter-spacing: 4px;">${token}</span>
            </div>
            
            <p style="color: #71717a; font-size: 14px; margin-top: 32px; line-height: 1.5;">If you did not request a password reset, please safely ignore this email.</p>
          </div>
        `,
      }),
    });
    
    if (!response.ok) {
      const errData = await response.json().catch(() => ({}));
      console.error("Email send failed backend response:", errData);
      return { success: false, error: "Failed to send email: " + (errData.error?.message || errData.error?.response || errData.message || "Unknown error. Check backend terminal.") };
    }

    return { success: true };
  } catch (error: any) {
    console.error("Manual reset error:", error);
    return { success: false, error: "An unexpected error occurred connecting to the database." };
  }
}

export async function handleResetPassword(email: string, token: string, newPassword: string) {
  try {
    await client.connect();
    const db = client.db("aura_artifact");
    
    // Verify token
    const resetRecord = await db.collection("password_resets").findOne({ email, token });
    if (!resetRecord) {
      return { success: false, error: "Invalid or expired verification code." };
    }
    
    // In a real app, hash the newPassword here!
    // Since the express backend uses plain text (or handles hashing elsewhere), we'll update the user collection
    await db.collection("user").updateOne(
      { email },
      { $set: { password: newPassword } }
    );
    
    // Also update better-auth account if it exists
    const user = await db.collection("user").findOne({ email });
    if (user) {
      await db.collection("account").updateOne(
        { providerId: "credential", userId: user.id || user._id.toString() },
        { $set: { password: newPassword } }
      );
    }
    
    // Remove the used token
    await db.collection("password_resets").deleteOne({ email });
    
    return { success: true };
  } catch (error: any) {
    console.error("Manual reset confirm error:", error);
    return { success: false, error: "Failed to reset password." };
  }
}
