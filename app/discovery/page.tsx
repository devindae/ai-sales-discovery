"use client";

import Link from "next/link";
import Image from "next/image";
import { stakeholders } from "@/lib/stakeholders";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DiscoveryPage() {
  const router = useRouter();

  const [teamName, setTeamName] = useState("");

  useEffect(() => {
    const teamData = localStorage.getItem("team");

    if (!teamData) {
      router.push("/login");
      return;
    }

    const team = JSON.parse(teamData);

    setTeamName(team.teamName);
  }, [router]);

  function handleLogout() {
  localStorage.removeItem("team");
  router.push("/");
}

  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto">

        <div className="flex justify-between items-center mb-8">

          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Nexa Manufacturing Management Team
            </h1>

            <p className="text-slate-600 mt-2">
              Conduct stakeholder discovery interviews to identify business
              challenges, operational gaps, and improvement opportunities.
            </p>

            <div className="mt-3">
              <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                Logged in as {teamName}
              </span>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="
              bg-red-600
              hover:bg-red-700
              text-white
              px-4
              py-2
              rounded-lg
            "
          >
            Logout
          </button>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

          {stakeholders.map((person) => (
            <Link
              key={person.id}
              href={`/discovery/${person.id}`}
              className="
                bg-white
                rounded-2xl
                shadow-md
                hover:shadow-xl
                hover:-translate-y-1
                transition-all
                p-6
                text-center
              "
            >
              <div className="flex justify-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden shadow-md">

                  <Image
                    src={person.image}
                    alt={person.name}
                    fill
                    sizes="128px"
                    className="object-cover object-top"
                  />

                </div>
              </div>

              <div className="mt-4">

                <h2 className="text-lg font-bold text-slate-900">
                  {person.name}
                </h2>

                <p className="text-sm text-slate-600 mt-1">
                  {person.role}
                </p>

              </div>
            </Link>
          ))}

        </div>
      </div>
    </main>
  );
}