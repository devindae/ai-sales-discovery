import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-slate-900">
          AI Sales Pitch Competition 2026
        </h1>

        <p className="text-2xl text-slate-500 mt-6">
          Nexa Manufacturing Discovery Portal
        </p>

        <div className="mt-10">
          <Link
            href="/discovery"
            className="
              inline-block
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-10
              py-4
              rounded-xl
              text-xl
              font-medium
            "
          >
            Start Discovery
          </Link>
        </div>
      </div>
    </main>
  );
}