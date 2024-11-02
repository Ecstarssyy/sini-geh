/** @type {import('next').NextConfig} */
const nextConfig = {
  // Needed for `signInWithRedirect` and custom `authDomain` configuration. See https://firebase.google.com/docs/auth/web/redirect-best-practices#proxy-requests
  // If you don't plan to use `signInWithRedirect` or custom `authDomain`, you can safely remove `rewrites` config.
  async rewrites() {
    return [
      {
        source: "/__/auth",
        destination: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com/__/auth`,
      },
      {
        source: "/__/auth/:path*",
        destination: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com/__/auth/:path*`,
      },
      {
        source: "/__/firebase/init.json",
        destination: `https://${process.env.FIREBASE_PROJECT_ID}.firebaseapp.com/__/firebase/init.json`,
      },
    ];
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
        port: "",
        pathname: "**",
      },
    ],
  },

  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
