import { NextResponse } from "next/server";

const HUGGINGFACE_API_KEY = process.env.HUGGINGFACE_API_KEY;

export async function POST(req) {
  try {
    const { totalBudget, totalIncome, totalSpend } = await req.json();

    const userPrompt = `
   Suppose you are a financial AI advisor, analyze the following details and provide actionable financial advice:
   - Total Budget: ₹${totalBudget}
   - Total Income: ₹${totalIncome}
   - Total Expense: ₹${totalSpend}
   How should I distribute my funds(in %), give me a general advice in brief in 3 lines.
`;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.2",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HUGGINGFACE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: userPrompt,
          parameters: { max_new_tokens: 350, temperature: 0.7 },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch Hugging Face response: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json({
      advice: data?.[0]?.generated_text || "No financial advice available.",
    });
  } catch (error) {
    console.error("Error in Hugging Face API route:", error);
    return NextResponse.json(
      { error: "Failed to fetch financial advice." },
      { status: 500 }
    );
  }
}
