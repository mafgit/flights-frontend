"use client";

import { useEffect } from "react";
import useAuthStore from "./useAuthStore";
import { IRole } from "@/types/IRole";
import Loading from "@/components/misc/Loading";
import { useRouter } from "next/navigation";

const AuthWrapper = ({
  allowedRoles,
  children,
}: {
  allowedRoles?: (IRole | "all")[];
  children: React.ReactNode;
}) => {
  const role = useAuthStore((state) => state.role);
  const loading = useAuthStore((state) => state.loading);
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const initializeSearch = useAuthStore((state) => state.initializeSearch);

  const router = useRouter();

  const isAllowed = () => {
    if (allowedRoles === undefined || allowedRoles.includes("all")) return true;

    if (allowedRoles.length === 0 && !role) return true;

    if (role && allowedRoles.includes(role)) return true;

    return false;
  };

  useEffect(() => {
    if (allowedRoles === undefined)
      fetchUser().finally(() => initializeSearch());
  }, []);

  useEffect(() => {
    if (!loading)
      if (!isAllowed())
        if (window.history.state && window.history.state.idx > 0) router.back();
        else router.push("/"); // todo: or replace
  }, [role, loading]);

  return loading ? (
    <div className="min-h-screen flex items-center justify-center">
      <Loading />
    </div>
  ) : isAllowed() ? (
    <div>{children}</div>
  ) : null;
};

export default AuthWrapper;
