import { ReactNode } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { UserProvider } from "@/context/UserContext"; // Adjust path if needed
import AppNavbar from "@/components/Navbar"; // Adjust import if needed
import "@/styles/globals.css";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <title>Bible App</title>
      </head>
      <body>
        <UserProvider>
          <NextUIProvider>
            <AppNavbar />{" "}
            {/* Navbar will have access to UserContext if needed */}
            <div style={{ padding: "20px" }}>{children}</div>
          </NextUIProvider>
        </UserProvider>
      </body>
    </html>
  );
}
