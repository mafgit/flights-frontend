"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import {
  FaCartFlatbed,
  FaLockOpen,
  FaPlaneDeparture,
  FaScroll,
} from "react-icons/fa6";

const Navbar = ({ animate = false }: { animate?: boolean }) => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(animate ? false : true);

  useEffect(() => {
    if (animate) {
      const onScroll = () => {
        const hero = document.getElementById("hero");
        const heroHeight = hero?.offsetHeight || 0;
        if (window.scrollY >= heroHeight) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      };
      document.addEventListener("scroll", onScroll);

      return () => document.removeEventListener("scroll", onScroll);
    }
  }, []);

  return (
    <>
      <div
        className={
          "fixed z-30 top-0 left-0 w-screen h-[55px] transition-all duration-700 ease-out " +
          (scrolled ? "bg-background/85 backdrop-blur-sm " : "")
        }
      >
        <div className="max-w-[1300px] mx-auto h-full flex items-center justify-between px-12">
          <Link
            href={"/"}
            className={
              "flex gap-3 transition-all items-center justify-center duration-700 ease-out "
              // (scrolled && window.location.pathname === "/"
              //   ? "opacity-100"
              //   : "opacity-0")
            }
          >
            {pathname !== "/" && animate && (
              <FaHome
                className={
                  "text-lg transition-all duration-700 ease-out " +
                  (scrolled ? "opacity-0" : "opacity-100")
                }
              />
            )}
            {(pathname === "/" || !animate) && (
              <div
                className={
                  "flex gap-3 transition-all duration-700 ease-out " +
                  (scrolled ? "opacity-100" : "opacity-0")
                }
              >
                <FaPlaneDeparture className="text-3xl" />
                <h1 className={"text-2xl font-bold "}>Flight Booker</h1>
              </div>
            )}
          </Link>

          <ul className="flex gap-4 items-center justify-center">
            <NavItem href="/view" name="Bookings">
              <FaScroll className="text-sm" />
            </NavItem>

            <NavItem href="/book/cart" name="Cart">
              <FaCartFlatbed className="text-sm" />
            </NavItem>

            <NavItem href="/login" name="Login">
              <FaLockOpen className="text-sm" />
            </NavItem>
          </ul>
        </div>
      </div>

      {!animate && <div className="pt-[55px]"></div>}
    </>
  );
};

export default Navbar;

function NavItem({
  href,
  name,
  children,
}: {
  href: string;
  name: string;
  children: ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        className="relative flex gap-1 items-center justify-center group"
      >
        {children}
        <span className="text-lg">{name}</span>
        <div className="absolute bottom-0 left-0 w-full scale-x-0 origin-center h-[2px] transition-all group-hover:scale-x-100 duration-200 rounded-full bg-primary-shade"></div>
      </Link>
    </li>
  );
}
