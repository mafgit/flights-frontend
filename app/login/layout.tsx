import AuthWrapper from "@/utils/AuthWrapper";
import { ReactNode } from "react";

const LoginLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthWrapper allowedRoles={["admin", "super_admin", "user"]}>
      {children}
    </AuthWrapper>
  );
};

export default LoginLayout;
