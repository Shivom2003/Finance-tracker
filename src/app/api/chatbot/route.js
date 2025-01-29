import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const { message } = await req.json();

    const response = await fetch("https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: message }),
    });

    const data = await response.json();

    return NextResponse.json({ reply: data[0]?.generated_text || "Sorry, I couldn't understand that." });
  } catch (error) {
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
