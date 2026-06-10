"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { useAuth } from "@/src/context/AuthContext";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {

  const router = useRouter();

  const {
    user,
    loading,
  } = useAuth();

  useEffect(() => {

    if (loading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (user.role !== "admin") {
      router.replace("/");
      return;
    }

  }, [
    user,
    loading,
    router,
  ]);

  if (loading) {
    return null;
  }

  if (!user) {
    return null;
  }

  if (user.role !== "admin") {
    return null;
  }

  return <>{children}</>;
}