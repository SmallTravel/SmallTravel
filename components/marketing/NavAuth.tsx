"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/config";
import type { User } from "@supabase/supabase-js";

export default function NavAuth({ mobile }: { mobile?: boolean }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setLoading(false);
      return;
    }

    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function signOut() {
    if (!isSupabaseConfigured()) return;
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  if (loading) {
    return <div className={mobile ? "h-10" : "w-16"} />;
  }

  if (user) {
    return (
      <div className={mobile ? "pt-3 flex flex-col gap-2" : "flex items-center gap-3"}>
        <Link
          href="/bookings"
          className={mobile ? "btn-secondary flex-1 !py-2 text-center" : "btn-ghost"}
        >
          My bookings
        </Link>
        <button
          onClick={signOut}
          className={mobile ? "btn-ghost flex-1 !py-2" : "btn-ghost text-ink-500"}
        >
          Log out
        </button>
      </div>
    );
  }

  return (
    <div className={mobile ? "pt-3 flex gap-2" : "flex items-center gap-3"}>
      <Link href="/login" className={mobile ? "btn-ghost flex-1 !py-2 text-center" : "btn-ghost"}>
        Log in
      </Link>
      <Link
        href="/signup"
        className={
          mobile
            ? "btn-primary flex-1 !py-2 !bg-brand-600 hover:!bg-brand-700 text-center"
            : "btn-primary !bg-brand-600 hover:!bg-brand-700 !text-sm !px-4 !py-2"
        }
      >
        Sign up
      </Link>
    </div>
  );
}
