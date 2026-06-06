"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getMe,
  logout as logoutRequest,
} from "@/src/lib/auth";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

type AuthContextType = {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
};

const AuthContext =
  createContext<AuthContextType | null>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] =
    useState<User | null>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    async function loadUser() {
      const token =
        localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const result = await getMe(token);

        if (result.success) {
          setUser(result.data);
        }
      } catch {
        localStorage.removeItem("token");
      }

      setLoading(false);
    }

    loadUser();
  }, []);

  async function logout() {
    const token =
      localStorage.getItem("token");

    if (token) {
      await logoutRequest(token);
    }

    localStorage.removeItem("token");

    setUser(null);

    window.location.href = "/";
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context =
    useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}