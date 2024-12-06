"use client"; // Mark this file as a client component

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { logout } from "@/lib/auth"; // Adjust the import if needed
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarItem,
  NavbarMenuItem,
  Link,
} from "@nextui-org/react";

export default function AppNavbar() {
  const router = useRouter();
  const { user, loading } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to toggle collapsible menu
  const [visible, setVisible] = useState(false); // State for logout confirmation modal

  const handleLogout = () => {
    setVisible(true); // Show confirmation modal
  };

  const confirmLogoutAction = async () => {
    try {
      await logout();
      console.log("Logout successful");
      router.push("/"); // Redirect to home page after logout
    } catch (err) {
      console.error("Logout error:", err);
    }
    setVisible(false); // Close the modal
  };

  const menuItems = [
    { label: "Checklist", href: "/checklist" },
    { label: "Plan", href: "/plan" },
  ];

  return (
    <>
      <Navbar onMenuOpenChange={setIsMenuOpen} isMenuOpen={isMenuOpen}>
        <NavbarContent>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="sm:hidden"
          />
          <NavbarBrand>
            <p className="font-bold text-inherit">Bible App</p>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {menuItems.map((item) => (
            <NavbarItem key={item.label}>
              <Link href={item.href}>{item.label}</Link>
            </NavbarItem>
          ))}
          {loading ? (
            <NavbarItem>
              <p>Loading...</p>
            </NavbarItem>
          ) : user ? (
            <>
              <NavbarItem>
                <span>Welcome, {user.email}</span>
              </NavbarItem>
              <NavbarItem>
                <button
                  className="text-red-500 hover:underline"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </NavbarItem>
            </>
          ) : (
            <>
              <NavbarItem>
                <Link href="/login" className="text-blue-500">
                  Login
                </Link>
              </NavbarItem>
              <NavbarItem>
                <Link href="/signup" className="text-blue-500">
                  Sign Up
                </Link>
              </NavbarItem>
            </>
          )}
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item) => (
            <NavbarMenuItem key={item.label}>
              <Link href={item.href}>{item.label}</Link>
            </NavbarMenuItem>
          ))}
          {loading ? (
            <NavbarMenuItem>Loading...</NavbarMenuItem>
          ) : user ? (
            <>
              <NavbarMenuItem>Welcome, {user.email}</NavbarMenuItem>
              <NavbarMenuItem>
                <button
                  className="text-red-500 w-full text-left"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </NavbarMenuItem>
            </>
          ) : (
            <>
              <NavbarMenuItem>
                <Link href="/login">Login</Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link href="/signup">Sign Up</Link>
              </NavbarMenuItem>
            </>
          )}
        </NavbarMenu>
      </Navbar>

      {/* Move the modal outside of the Navbar */}
      {visible && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold text-center mb-4">
              Are you sure you want to log out?
            </h3>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                onClick={() => setVisible(false)}
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                onClick={confirmLogoutAction}
              >
                Confirm Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
