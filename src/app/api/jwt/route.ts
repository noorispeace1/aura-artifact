import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { auth } from '@/lib/auth';

export async function GET(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Create JWT for 6 days using jsonwebtoken
    const token = jwt.sign(
      { 
        userId: session.user.id, 
        email: session.user.email,
        name: session.user.name 
      }, 
      process.env.JWT_SECRET || 'aura-artifact-secret-key-2026', 
      { expiresIn: '6d' } // 6 days
    );

    const response = NextResponse.json({ success: true, token });
    
    // Set it as an HTTP-only cookie for 6 days
    response.cookies.set({
      name: 'aura_jwt',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 6 * 24 * 60 * 60, // 6 days in seconds
    });

    return response;
  } catch (error) {
    console.error("JWT Generation error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
