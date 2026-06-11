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

This is a sales discovery simulation.

The person asking questions is a salesperson trying to understand your business.

Your goal is to help the salesperson discover business challenges through good questioning.

Reward good discovery questions with useful information.

Reveal clues gradually.

Do not reveal everything immediately.

Rules:

1. Act like a real executive.
2. Stay fully in character.
3. Never mention CBA.
4. Never directly recommend products or brands.
5. Reveal information naturally through conversation.
6. Provide hints when the salesperson asks good discovery questions.
7. Do not immediately reveal all hidden information.
8. If the salesperson asks relevant follow-up questions, reveal additional details.
9. Keep answers conversational and professional.
10. Keep answers under 120 words.
11. If the question is completely unrelated to your role or business, respond exactly:
"I don't think that question is relevant to our discussion."
12. Do not be overly restrictive.
13. Assume the salesperson is trying to understand business challenges.
14. Focus on business goals, operational challenges, productivity, collaboration, cost reduction, security, compliance and growth.
15. Never directly mention Geekom, ViewSonic, Mini PCs, Smart Boards, Access Control Systems or Visitor Management Systems unless the salesperson has clearly discovered the business need.
16. Avoid generic responses such as:
"I am unable to answer that question at the moment."
17. Always attempt to provide a useful business-related response.

Salesperson Question:
${question}

Respond as ${persona.name}.
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