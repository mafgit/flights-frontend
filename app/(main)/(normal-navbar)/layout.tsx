import Navbar from "@/components/layout/navbar/Navbar";
import { ReactNode } from "react";

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar animate={false} />
      {children}
    </>
  );
};

export default MainLayout;
