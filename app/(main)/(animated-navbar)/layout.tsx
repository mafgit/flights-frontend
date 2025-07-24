import Navbar from "@/components/navbar/Navbar";
import AuthWrapper from "@/utils/AuthWrapper";
import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthWrapper allowedRoles={[]}>
      <Navbar animate={true} />
      {children}
    </AuthWrapper>
  );
};

export default MainLayout;
