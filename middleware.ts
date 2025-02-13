import { NextRequest, NextResponse } from "next/server";
import {
  authMiddleware,
  redirectToHome,
  redirectToLogin,
} from "next-firebase-auth-edge";
import { authConfig } from "./config/server-config";

const PUBLIC_PATHS = ["/register", "/login", "/reset-password"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard") || pathname.startsWith("/api")) {
    return authMiddleware(request, {
      loginPath: "/api/login",
      logoutPath: "/api/logout",
      refreshTokenPath: "/api/refresh-token",
      enableMultipleCookies: authConfig.enableMultipleCookies,
      apiKey: authConfig.apiKey,
      cookieName: authConfig.cookieName,
      cookieSerializeOptions: authConfig.cookieSerializeOptions,
      cookieSignatureKeys: authConfig.cookieSignatureKeys,
      serviceAccount: authConfig.serviceAccount,
      handleValidToken: async (
        { token, decodedToken, customToken },
        headers
      ) => {
        // Authenticated user should not be able to access /login, /register and /reset-password routes
        if (PUBLIC_PATHS.includes(request.nextUrl.pathname)) {
          return redirectToHome(request);
        }

        return NextResponse.next({
          request: {
            headers,
          },
        });
      },
      handleInvalidToken: async (_reason) => {
        return redirectToLogin(request, {
          path: "/login",
          publicPaths: PUBLIC_PATHS,
        });
      },
      handleError: async (error) => {
        console.error("Unhandled authentication error", { error });

        return redirectToLogin(request, {
          path: "/login",
          publicPaths: PUBLIC_PATHS,
        });
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    // "/admin/:path*",
    "/((?!_next|favicon.ico|__/auth|__/firebase|api|.*\\.).*)",
    "/api/login",
    "/api/logout",
    "/api/refresh-token",
  ],
};
