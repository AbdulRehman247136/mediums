import type { Metadata } from "next";
import "./globals.css";

import SessionProviderWrapper from "../SessionProviderWrapper";


export const metadata: Metadata = {
  title: "My App",
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
