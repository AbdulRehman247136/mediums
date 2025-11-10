import type { Metadata } from "next";
import "./globals.css";

import SessionProviderWrapper from "../SessionProviderWrapper";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Medium Clone",
  description: "Next.js with NextAuth",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        
        <SessionProviderWrapper>{children}</SessionProviderWrapper>
      </body>
    </html>
  );
}
