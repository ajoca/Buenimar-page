"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

import { fetchPanelSession } from "@/services/authService";
import type { PanelSession, UserRole } from "@/src/lib/panel/types";

type AuthContextValue = {
  session: PanelSession | null;
  loading: boolean;
  hasRole: (roles: UserRole[]) => boolean;
  refreshSession: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<PanelSession | null>(null);
  const [loading, setLoading] = useState(true);

  async function refreshSession() {
    try {
      setLoading(true);
      const payload = await fetchPanelSession();
      setSession(payload.data);
    } catch {
      setSession(null);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refreshSession();
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      loading,
      hasRole: (roles) => !!session && roles.includes(session.role),
      refreshSession,
    }),
    [session, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
