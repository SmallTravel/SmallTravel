import Link from "next/link";
import { MapPin } from "lucide-react";
import AuthForm from "@/components/auth/AuthForm";

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const params = await searchParams;
  const nextPath = params.next || "/tours";

  return (
    <main className="min-h-screen bg-ink-50 flex flex-col">
      <div className="container-narrow px-6 sm:px-10 lg:px-16 py-8">
        <Link href="/" className="inline-flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-brand-600 flex items-center justify-center text-white">
            <MapPin className="w-4 h-4" />
          </div>
          <span className="font-semibold text-ink-900">Australia Trip Planner</span>
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 pb-16">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-semibold text-ink-900 text-center">Create your account</h1>
          <p className="mt-2 text-sm text-ink-500 text-center">
            Book authentic Australian tours direct from local operators.
          </p>

          <div className="mt-8 rounded-2xl border border-ink-200 bg-white p-6 shadow-sm">
            <AuthForm mode="signup" nextPath={nextPath} />
          </div>
        </div>
      </div>
    </main>
  );
}
