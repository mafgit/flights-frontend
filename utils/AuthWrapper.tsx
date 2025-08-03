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
  allowedRoles: (IRole | "all")[];
  children: React.ReactNode;
}) => {
  const role = useAuthStore((state) => state.role);
  const loading = useAuthStore((state) => state.loading);
  const fetchUser = useAuthStore((state) => state.fetchUser);
  const initializeSearch = useAuthStore((state) => state.initializeSearch);

  const router = useRouter();

  useEffect(() => {
    fetchUser().finally(() => initializeSearch());
  }, []);

  useEffect(() => {
    if (!loading) {
      if (allowedRoles.length === 0 && !role) return;
      if (
        allowedRoles.includes("all") ||
        (role && allowedRoles.includes(role))
      ) {
        return;
      }

      if (window.history.state && window.history.state.idx > 0) {
        router.back();
      } else {
        router.push("/"); // todo: or replace
      }
    }
  }, [role, loading]);

  return loading ? <Loading /> : <div>{children}</div>;
};

export default AuthWrapper;
