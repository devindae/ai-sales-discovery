import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-slate-100">
      <h1 className="text-5xl font-bold text-slate-900">
        AI Sales Pitch Competition 2026
      </h1>

      <p className="mt-4 text-xl text-gray-500">
        Nexa Manufacturing Discovery Portal
      </p>

      <div className="mt-8">
        <Link
          href="/discovery"
          className="
            bg-blue-600
            hover:bg-blue-700
            text-white
            px-8
            py-4
            rounded-lg
            font-medium
          "
        >
          Start Discovery
        </Link>
      </div>
    </main>
  );
}