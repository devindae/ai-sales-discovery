import Link from "next/link";
import Image from "next/image";
import { stakeholders } from "@/lib/stakeholders";
import ChatClient from "./ChatClient";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function StakeholderPage({
  params,
}: Props) {
  const { id } = await params;

  const stakeholder = stakeholders.find(
    (person) => person.id === id
  );

  if (!stakeholder) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">
          Stakeholder Not Found
        </h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <div className="bg-white border-b shadow-sm px-6 py-4">
        <Link
          href="/discovery"
          className="text-blue-600 hover:underline"
        >
          ← Back to Stakeholders
        </Link>
      </div>

      <div className="flex h-[calc(100vh-70px)]">
        {/* SIDEBAR */}

        <div className="w-[280px] bg-white border-r p-6">
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-lg">
              <Image
                src={stakeholder.image}
                alt={stakeholder.name}
                fill
                sizes="128px"
                className="object-cover"
              />
            </div>

            <h1 className="text-xl font-bold mt-5 text-center">
              {stakeholder.name}
            </h1>

            <p className="text-slate-600 text-center">
              {stakeholder.role}
            </p>
          </div>

          <div className="mt-8 bg-slate-50 rounded-xl p-5">
            <p className="text-sm text-slate-500">
              Maximum Questions
            </p>

            <p className="text-5xl font-bold text-blue-600 mt-2">
              {stakeholder.questionLimit}
            </p>
          </div>
        </div>

        {/* CHAT AREA */}

        <div className="flex-1 flex flex-col">
          <ChatClient
            stakeholderName={stakeholder.name}
            stakeholderId={stakeholder.id}
            questionLimit={stakeholder.questionLimit}
          />
        </div>
      </div>
    </main>
  );
}