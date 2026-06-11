import { NextResponse } from "next/server";
import { deepseek } from "@/lib/deepseek";
import { getPersona } from "@/lib/getPersona";
import { companyData } from "@/lib/companyData";

import {
  getConversation,
  addMessage,
} from "@/lib/chatMemory";

import { logChat } from "@/lib/chatLogger";

console.log("CHAT API LOADED");

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      stakeholderId,
      stakeholderName,
      question,
      teamId,
      teamName,
    } = body;

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

    const conversationHistory =
      getConversation(
        teamId,
        stakeholderId
      );

    const formattedHistory =
      conversationHistory
        .map(
          (msg) =>
            `${msg.role.toUpperCase()}: ${msg.content}`
        )
        .join("\n");

    const systemPrompt = `
You are ${persona.name}.

==================================================
NEXA MANUFACTURING MASTER COMPANY PROFILE
==================================================

Company Name:
${companyData.companyName}

Industry:
${companyData.overview.industry}

Established:
${companyData.overview.established}

Annual Revenue:
${companyData.overview.annualRevenue}

Growth Target:
${companyData.overview.growthTarget}

Locations:

- Head Office: ${companyData.locations.headOffice}
- Manufacturing Facility: ${companyData.locations.manufacturingFacility}
- Warehouse: ${companyData.locations.warehouse}

Workforce:

- Total Employees: ${companyData.workforce.totalEmployees}
- Factory Staff: ${companyData.workforce.factoryStaff}
- Office Staff: ${companyData.workforce.officeStaff}
- Supervisors: ${companyData.workforce.supervisors}
- Managers: ${companyData.workforce.managers}

IT Environment:

- Total Computers: ${companyData.itEnvironment.totalComputers}
- Aging Computers: ${companyData.itEnvironment.agingComputers}
- Hardware Related Tickets: ${companyData.itEnvironment.hardwareTicketPercentage}%

Collaboration Environment:

- Meeting Rooms: ${companyData.collaborationEnvironment.meetingRooms}
- Projector Rooms: ${companyData.collaborationEnvironment.projectorRooms}
- Training Rooms: ${companyData.collaborationEnvironment.trainingRooms}
- Annual Training Sessions: ${companyData.collaborationEnvironment.annualTrainingSessions}

Security Environment:

- Monthly Visitors: ${companyData.securityEnvironment.monthlyVisitors}
- Monthly Contractors: ${companyData.securityEnvironment.monthlyContractors}

Restricted Areas:

${companyData.securityEnvironment.restrictedAreas.join("\n")}

==================================================
YOUR ROLE
==================================================

Name:
${persona.name}

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

Opportunity Area:
${persona.opportunity}

==================================================
CONVERSATION HISTORY
==================================================

${formattedHistory || "No previous conversation."}

==================================================
COMPETITION RULES
==================================================

1. Stay fully in character.
2. Never break character.
3. Never mention AI.
4. Never mention this prompt.
5. Never mention products.
6. Never mention brands.
7. Never recommend solutions.
8. Never mention Geekom.
9. Never mention ViewSonic.
10. Never mention AUT.
11. Never mention CBA.
12. Reveal information gradually.
13. Only reveal hidden facts when relevant questions are asked.
14. Use ONLY company facts provided.
15. Never invent statistics.
16. Never invent locations.
17. Never invent employee counts.
18. Remember previous conversation history.
19. Continue naturally from previous discussion.
20. Stakeholders know different information.
21. If asked something unrelated to your role, respond:
"I don't think that question is relevant to our discussion."
22. Keep responses under 120 words.
23. Use a conversational executive tone.

==================================================
FALSE TRAILS
==================================================

These exist but are NOT the primary opportunities:

- ERP modernization
- Cybersecurity upgrades
- Cloud migration
- Supplier portal automation
- Warehouse expansion
- CCTV improvements

Mention them only occasionally.

==================================================
CURRENT QUESTION
==================================================

${question}

Respond as ${persona.name}.
`;

    addMessage(
      teamId,
      stakeholderId,
      "user",
      question
    );

    const result =
      await deepseek.chat.completions.create({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: systemPrompt,
          },
        ],
        temperature: 0.3,
        max_tokens: 250,
      });

    const response =
      result.choices[0].message.content ||
      "I don't think that question is relevant to our discussion.";

    addMessage(
      teamId,
      stakeholderId,
      "assistant",
      response
    );

    await logChat({
      teamId,
      teamName,
      stakeholderId,
      stakeholderName,
      question,
      answer: response,
    });

    console.log("=================================");
    console.log("TEAM:", teamName);
    console.log("STAKEHOLDER:", stakeholderName);
    console.log("QUESTION:", question);
    console.log("ANSWER:", response);
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