"use client";

import { UserCredential, signInWithEmailAndPassword } from "firebase/auth";
import * as React from "react";
import { useLoadingCallback } from "react-loading-hook";
import { loginWithCredential } from "../../../api";
import { getFirebaseAuth } from "../../../auth/firebase";
import { useRedirectAfterLogin } from "../../../shared/useRedirectAfterLogin";
import { useRedirectParam } from "../../../shared/useRedirectParam";
import { LoginForm } from "@/components/login/LoginForm";

export default function Login() {
  const [hasLogged, setHasLogged] = React.useState(false);
  const redirect = useRedirectParam();
  const redirectAfterLogin = useRedirectAfterLogin();

  async function handleLogin(credential: UserCredential) {
    await loginWithCredential(credential);
    redirectAfterLogin();
  }

  const [handleLoginWithEmailAndPassword, isEmailLoading, emailPasswordError] =
    useLoadingCallback(
      async ({ email, password }: { email: string; password: string }) => {
        setHasLogged(false);

        const auth = getFirebaseAuth();
        await handleLogin(
          await signInWithEmailAndPassword(auth, email, password)
        );

        setHasLogged(true);
      }
    );

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="font-bold mb-8 text-5xl">Login</h1>
      {hasLogged && (
        <div className="">
          <span>
            Redirecting to <strong>{redirect || "/"}</strong>
          </span>
        </div>
      )}
      {!hasLogged && (
        <LoginForm
          loading={isEmailLoading}
          onSubmit={handleLoginWithEmailAndPassword}
          error={emailPasswordError}
        />
      )}
    </div>
  );
}
