"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/config";

type Mode = "login" | "signup";

export default function AuthForm({
  mode,
  nextPath = "/tours",
}: {
  mode: Mode;
  nextPath?: string;
}) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const configured = isSupabaseConfigured();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (!configured) {
      setError("Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL to .env.local");
      return;
    }

    setLoading(true);
    const supabase = createClient();

    if (mode === "signup") {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { full_name: fullName },
          emailRedirectTo: `${window.location.origin}/auth/callback?next=${encodeURIComponent(nextPath)}`,
        },
      });

      if (signUpError) {
        setError(signUpError.message);
        setLoading(false);
        return;
      }

      setMessage("Check your email to confirm your account, then log in.");
      setLoading(false);
      return;
    }

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    router.push(nextPath);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === "signup" && (
        <div>
          <label htmlFor="fullName" className="block text-sm font-medium text-ink-700 mb-1">
            Full name
          </label>
          <input
            id="fullName"
            type="text"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full rounded-xl border border-ink-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
            placeholder="Sam Taylor"
          />
        </div>
      )}

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-ink-700 mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-ink-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
          placeholder="you@email.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-ink-700 mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          required
          minLength={6}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-ink-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500/30 focus:border-brand-500"
          placeholder="At least 6 characters"
        />
      </div>

      {error && (
        <p className="text-sm text-rose-600 bg-rose-50 border border-rose-100 rounded-xl px-4 py-3">
          {error}
        </p>
      )}

      {message && (
        <p className="text-sm text-emerald-700 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3">
          {message}
        </p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full !bg-brand-600 hover:!bg-brand-700 disabled:opacity-60"
      >
        {loading ? "Please wait…" : mode === "login" ? "Log in" : "Create account"}
      </button>

      <p className="text-sm text-center text-ink-500">
        {mode === "login" ? (
          <>
            No account?{" "}
            <Link href={`/signup?next=${encodeURIComponent(nextPath)}`} className="text-brand-600 font-medium hover:underline">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already registered?{" "}
            <Link href={`/login?next=${encodeURIComponent(nextPath)}`} className="text-brand-600 font-medium hover:underline">
              Log in
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
