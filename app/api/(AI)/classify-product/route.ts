import { getCurrentUser } from "@/utils/getCurrentUser";
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { name, description } = await req.json();

    if (!name || !description) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const prompt = `
You are an AI product classification engine.

Classify the product strictly in JSON format.

Predefined Categories:
["Packaging", "Tableware", "Office Supplies", "Cleaning", "Personal Care"]

Do not include explanations or markdown. Return valid JSON only.

Return JSON only:

{
  "primary_category": "",
  "sub_category": "",
  "seo_tags": [],
  "sustainability_filters": []
}

Product Name: ${name}
Description: ${description}
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
