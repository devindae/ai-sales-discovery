"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { validateLogin } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();

  const [username, setUsername] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  function handleLogin() {
    const team = validateLogin(
      username,
      password
    );

    if (!team) {
      setError("Invalid login");
      return;
    }

    localStorage.setItem(
      "team",
      JSON.stringify(team)
    );

    router.push("/discovery");
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-10 rounded-xl shadow-lg w-[400px]">
        <h1 className="text-3xl font-bold mb-6">
          Team Login
        </h1>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="
            w-full
            border
            p-3
            rounded-lg
            mb-4
          "
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="
            w-full
            border
            p-3
            rounded-lg
            mb-4
          "
        />

        {error && (
          <p className="text-red-600 mb-4">
            {error}
          </p>
        )}

        <button
          onClick={handleLogin}
          className="
            w-full
            bg-blue-600
            hover:bg-blue-700
            text-white
            p-3
            rounded-lg
          "
        >
          Login
        </button>
      </div>
    </main>
  );
}