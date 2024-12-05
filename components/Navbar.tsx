// components/Navbar.tsx
"use client"; // Mark this file as a client component

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function AppNavbar() {
  const router = useRouter();

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Bible App</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" onClick={() => router.push("/")}>
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" onClick={() => router.push("/checklist")}>
            Checklist
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" onClick={() => router.push("/settings")}>
            Settings
          </Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
