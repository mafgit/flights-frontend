import Navbar from "@/components/layout/navbar/Navbar";
import AuthWrapper from "@/utils/AuthWrapper";
import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthWrapper allowedRoles={[]}>
      <Navbar animate={false} />
      {children}
    </AuthWrapper>
  );
};

export default MainLayout;
