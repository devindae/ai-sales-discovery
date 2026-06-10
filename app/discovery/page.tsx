import Link from "next/link";
import Image from "next/image";
import { stakeholders } from "@/lib/stakeholders";

export default function DiscoveryPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-8">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">
            Nexa Manufacturing Management Team
          </h1>

          <p className="text-slate-600 mt-2">
            Conduct stakeholder discovery interviews to identify business challenges, operational gaps, and improvement opportunities.
          </p>
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