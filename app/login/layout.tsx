import Navbar from "@/components/layout/navbar/Navbar";
import AuthWrapper from "@/utils/AuthWrapper";
import { ReactNode } from "react";

const LoginLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthWrapper allowedRoles={[]}>
      <Navbar />
      {children}
    </AuthWrapper>
  );
};

export default LoginLayout;
