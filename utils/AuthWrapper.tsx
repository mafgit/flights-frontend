"use client";

import { useEffect } from "react";
import useMyStore from "./useMyStore";
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
  const role = useMyStore((state) => state.role);
  const loading = useMyStore((state) => state.loading);
  const fetchUser = useMyStore((state) => state.fetchUser);

  const router = useRouter();

  useEffect(() => {
    fetchUser();
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
