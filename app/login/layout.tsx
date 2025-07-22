import AuthWrapper from "@/utils/AuthWrapper";
import { ReactNode } from "react";

const LoginLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthWrapper allowedRoles={[]}>
      {children}
    </AuthWrapper>
  );
};

export default LoginLayout;
