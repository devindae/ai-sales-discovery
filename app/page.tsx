"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center px-6">
      <div className="max-w-4xl w-full text-center">

        <h1 className="text-6xl font-bold text-slate-900">
          AI Sales Pitch Competition 2026
        </h1>

        <p className="mt-4 text-2xl text-slate-600">
          Nexa Manufacturing Discovery Portal
        </p>

        <div className="mt-10 bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-3xl font-bold text-slate-900 mb-4">
            Welcome to the Discovery Challenge
          </h2>

          <p className="text-slate-600 text-lg leading-relaxed">
            Your objective is to engage with key stakeholders of Nexa
            Manufacturing, uncover operational challenges, identify hidden
            opportunities, and gather insights to develop a winning business
            solution.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mt-8">

            <div className="bg-slate-50 rounded-xl p-6">
              <div className="text-4xl font-bold text-blue-600">
                9
              </div>
              <div className="text-slate-600 mt-2">
                Stakeholders
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-6">
              <div className="text-4xl font-bold text-green-600">
                3
              </div>
              <div className="text-slate-600 mt-2">
                Hidden Opportunities
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-6">
              <div className="text-4xl font-bold text-purple-600">
                4
              </div>
              <div className="text-slate-600 mt-2">
                Competing Teams
              </div>
            </div>

          </div>

          <div className="mt-8 text-left bg-blue-50 border border-blue-100 rounded-xl p-6">

            <h3 className="font-bold text-lg text-slate-900 mb-3">
              Competition Rules
            </h3>

            <ul className="space-y-2 text-slate-700">
              <li>• Interview stakeholders and gather information.</li>
              <li>• Ask effective discovery questions.</li>
              <li>• Identify operational challenges and business needs.</li>
              <li>• Connect findings across multiple stakeholders.</li>
              <li>• Develop a compelling solution proposal.</li>
            </ul>

          </div>

          <button
            onClick={() => router.push("/login")}
            className="
              mt-8
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-10
              py-4
              rounded-xl
              text-lg
              font-semibold
            "
          >
            Team Login
          </button>

        </div>

      </div>
    </main>
  );
}