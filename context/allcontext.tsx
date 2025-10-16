/** @format */
"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { usePathname } from "next/navigation";

interface UserInfoProps {
  firstName: string;
  lastName: string;
  tgUsername: string;
}

interface ContextValues {

  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  modalIsActive: boolean;
  setModalIsActive: (active: boolean) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  activeTab?: string;
  setActiveTab: (tab: string) => void;
 
}

const AppContext = createContext<ContextValues | undefined>(undefined);

export function ContextProvider({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [modalIsActive, setModalIsActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isMenuOpen]);

  const values: ContextValues = {
    sidebarOpen,
    setSidebarOpen,
    modalIsActive,
    setModalIsActive,
    isMenuOpen,
    setIsMenuOpen,
    activeTab,
    setActiveTab,

  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
}

export function useAllContx(): ContextValues {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAllContx must be used within a ContextProvider");
  }
  return context;
}
