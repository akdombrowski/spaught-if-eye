import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function ReadFormData(request: NextRequest) {
  const formData = await request.formData();
  const name = formData.get("name");
  const email = formData.get("email");
  return { name, email };
}

export async function GET(request: NextRequest) {
  const cookieStore = cookies();
  const token = cookieStore.get("token");

  return new Response("Hello, Next.js!", {
    status: 200,
    headers: { "Set-Cookie": `token=${token?.value}` },
  });
}

export async function POST(request: NextRequest) {
  const res = await request.json();
  return NextResponse.json({ res });
}
