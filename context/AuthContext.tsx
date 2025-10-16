"use client";
import React, { createContext, useEffect, useState, ReactNode } from "react";

interface AuthState {
  user: any;
}

const userString =
  typeof window !== "undefined" ? localStorage.getItem("user") : null;
const user = userString ? JSON.parse(userString) : null;

const INITIAL_STATE: AuthState = {
  user: user,
};

export const AuthContext = createContext<
  [AuthState, React.Dispatch<React.SetStateAction<AuthState>>]
>([INITIAL_STATE, () => {}]);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [authState, setAuthState] = useState<AuthState>(INITIAL_STATE);

  useEffect(() => {
    window.localStorage.setItem("kvUser", JSON.stringify(authState.user));
  }, [authState.user]);

  return (
    <AuthContext.Provider value={[authState, setAuthState]}>
      {children}
    </AuthContext.Provider>
  );
};
