import { NextResponse } from "next/server";
import { model } from "@/lib/gemini";
import { getPersona } from "@/lib/getPersona";

console.log("CHAT API LOADED");

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { stakeholderId, question } = body;

    const persona = getPersona(stakeholderId);

    if (!persona) {
      return NextResponse.json(
        {
          error: "Persona not found",
        },
        {
          status: 404,
        }
      );
    }

    const prompt = `
You are ${persona.name}.

Role:
${persona.role}

Personality:
${persona.personality}

Objectives:
${persona.objectives.join(", ")}

Known Facts:
${persona.knownFacts.join("\n")}

Hidden Facts:
${persona.hiddenFacts.join("\n")}

Rules:

1. Act like a real executive.
2. Never mention CBA.
3. Never recommend products.
4. Only answer what is asked.
5. Reveal hidden facts only when relevant.
6. Keep answers under 150 words.
7. Speak naturally and professionally.
8. Stay fully in character.

Question:
${question}
`;

    console.log("=================================");
    console.log("QUESTION:", question);
    console.log("STAKEHOLDER:", persona.name);
    console.log("=================================");

    const result = await model.generateContent(prompt);

    const response = await result.response.text();

    console.log("=================================");
    console.log("GEMINI RESPONSE");
    console.log(response);
    console.log("=================================");

    return NextResponse.json({
      answer: response,
    });

  } catch (error: any) {
    console.error("=================================");
    console.error("GEMINI ERROR");
    console.error("=================================");
    console.error(error);
    console.error("=================================");

    return NextResponse.json(
      {
        error: error?.message || String(error),
      },
      {
        status: 500,
      }
    );
  }
}