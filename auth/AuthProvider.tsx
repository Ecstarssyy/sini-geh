"use client";

import * as React from "react";
import { AuthContext, User } from "./AuthContext";
import ThemeProvider from "@/components/layout/ThemeToggle/theme-provider";

export interface AuthProviderProps {
  user: User | null;
  children: React.ReactNode;
}

export const AuthProvider: React.FunctionComponent<AuthProviderProps> = ({
  user,
  children,
}) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthContext.Provider
        value={{
          user,
        }}
      >
        {children}
      </AuthContext.Provider>
    </ThemeProvider>
  );
};
