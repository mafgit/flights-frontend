import AuthWrapper from "@/utils/AuthWrapper";
import { ReactNode } from "react";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthWrapper allowedRoles={["admin", "super_admin"]}>
      {children}
    </AuthWrapper>
  );
};

export default AdminLayout;
