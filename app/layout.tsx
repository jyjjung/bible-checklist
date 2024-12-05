// app/layout.tsx
import { ReactNode } from "react";
import { NextUIProvider } from "@nextui-org/react";
import AppNavbar from "@/components/Navbar"; // Adjust import if needed
import "@/styles/globals.css"; // Your global styles, make sure it's linked

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Bible App</title>
      </head>
      <body>
        <NextUIProvider>
          <AppNavbar /> {/* This renders the Navbar globally */}
          <div style={{ padding: "20px" }}>
            {children} {/* This is where the page-specific content will go */}
          </div>
        </NextUIProvider>
      </body>
    </html>
  );
}
