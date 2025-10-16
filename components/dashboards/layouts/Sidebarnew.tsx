/** @format */

"use client";
import React, { useContext, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import SidebarLink from "./SidebarLinks";
import { customerNavItems, vendorNavItems } from "./links";
import { signOut } from "next-auth/react";
import { useAllContx } from "@/context/allcontext";
import { AuthContext } from "@/context/AuthContext";
import { deleteTokenCookie, deleteTypeCookie } from "@/app/utils/cookieCutter";
// import Cookies from "js-cookie";

export default function SidebarNew() {
  const pathname = usePathname();
  const router = useRouter();
  const { sidebarOpen, setSidebarOpen } = useAllContx();

  const isVendor = pathname?.startsWith("/vendor");
  const navItems = isVendor ? vendorNavItems : customerNavItems;

  const [authState, setAuthState] = useContext<any>(AuthContext);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (sidebarOpen && e.key === "Escape") {
        setSidebarOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [sidebarOpen, setSidebarOpen]);

  const handleLogout = async () => {
    // try {
    //   await signOut({ redirect: false });
    //   router.push("/login");
    // } catch (error) {
    //   console.error("Logout error:", error);
    // }
    try {
      setAuthState({
        user: null,
      });
      await deleteTokenCookie();
      await deleteTypeCookie();
      window.location.replace("/");
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-100 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <p>yyyyyyy</p>
        </div>
      )}

      <aside
        className={`fixed bg-white font-interTightText border-r shadow-md left-0 top-16 z-100 w-[220px] h-[calc(100vh-4rem)] flex flex-col transition-all duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1">
            <nav className="w-full ">
              {navItems.map((item) => {
                return (
                  <SidebarLink
                    key={item.name}
                    href={item.href}
                    label={item.name}
                    icon={item.icon}
                    badgeLabel={item.badgeLabel}
                  />
                );
              })}
            </nav>

            <div className="p-4  mt-24  ">
              <button
                onClick={handleLogout}
                className="flex w-full hover:bg-red-500/20 font-gabaritoHeading  text-kv-primary items-center transition-all px-4 py-2 hover:rounded-md text-sm font-normal "
              >
                <LogOut className="w-5 h-5 mr-3" />
                <span>Log out</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
