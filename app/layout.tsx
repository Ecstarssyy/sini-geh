import "./globals.css";
import { Metadata } from "next";
import { getTokens } from "next-firebase-auth-edge";
import { cookies, headers } from "next/headers";
import { authConfig } from "../config/server-config";
import { AuthProvider } from "../auth/AuthProvider";
import NextTopLoader from "nextjs-toploader";
import { toUser } from "../shared/user";
import { Toaster } from "@/components/ui/toaster";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const tokens = await getTokens(cookies(), {
    ...authConfig,
    headers: headers(),
  });
  const user = tokens ? toUser(tokens) : null;

  return (
    <html lang="en">
      <head />
      <body suppressHydrationWarning={true}>
        <NextTopLoader showSpinner={false} />
        <AuthProvider user={user}>
          <Toaster />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  title: "NextJs Firebase Auth",
  description: "Next.js login page with Firebase authentication",
  icons: "/favicon.ico",
};
