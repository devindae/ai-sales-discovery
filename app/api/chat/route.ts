import { NextResponse } from "next/server";
import { deepseek } from "@/lib/deepseek";
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
2. Stay fully in character.
3. Speak naturally and professionally.
4. Keep answers under 120 words.
5. Never mention products directly.
6. Never mention vendors.
7. Reveal hidden facts only if the user asks relevant discovery questions.
8. If a question is completely unrelated to your role, respond:
"I think that question is not relevant to our conversation."
9. Do not reveal everything at once.
10. Give hints gradually like a real stakeholder.
11. Do not say "I am unable to answer" unless absolutely necessary.
12. Try to provide useful business information whenever possible.

User Question:
${question}
`;

    console.log("=================================");
    console.log("QUESTION:", question);
    console.log("STAKEHOLDER:", persona.name);
    console.log("=================================");

    const result = await deepseek.chat.completions.create({
      model: "deepseek-chat",
      messages: [
        {
          role: "system",
          content: prompt,
        },
      ],
      temperature: 0.7,
      max_tokens: 200,
    });

    const response =
      result.choices[0].message.content ||
      "I think that question is not relevant to our conversation.";

    console.log("=================================");
    console.log("DEEPSEEK RESPONSE");
    console.log(response);
    console.log("=================================");

    return NextResponse.json({
      answer: response,
    });
  } catch (error: any) {
    console.error("=================================");
    console.error("DEEPSEEK ERROR");
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