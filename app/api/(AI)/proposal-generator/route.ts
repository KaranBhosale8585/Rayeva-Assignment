import { ProposalLog } from "@/models/AiLog";
import { getCurrentUser } from "@/utils/getCurrentUser";
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { budget, event_type, guests } = await req.json();

    if (!budget || !event_type || !guests) {
      return NextResponse.json( { message: "Missing required fields" }, { status: 400 });
    }

    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const prompt = `
You are a sustainable procurement AI assistant.

Generate a B2B sustainable product proposal.

Constraints:
- Total budget: ₹${budget}
- Event: ${event_type}
- Guests: ${guests}

Do not include explanations or markdown. Return valid JSON only.

Return STRICT JSON:

{
  "product_mix": [
    {
      "product_name": "",
      "quantity": 0,
      "unit_price": 0,
      "total_price": 0
    }
  ],
  "budget_summary": {
    "total_allocated": 0,
    "remaining_budget": 0
  },
  "impact_positioning": ""
}
`;

    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_API_KEY!,
    });

    const resp = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    if (!resp.text) {
      return NextResponse.json({ message: "AI Error" }, { status: 500 });
    }

    const parsed = JSON.parse(resp.text);

    await ProposalLog.create({
      userId: user._id,
      budget,
      event_type,
      guests,
      response: parsed,
    });

    return new Response(JSON.stringify({ result: resp.text }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
    });
  }
}
