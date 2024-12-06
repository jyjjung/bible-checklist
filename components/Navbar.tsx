"use client"; // Mark this file as a client component

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/UserContext";
import { logout } from "@/lib/auth"; // Make sure this is the correct import for logout

export default function AppNavbar() {
  const router = useRouter();
  const { user, loading } = useUser();
  const [visible, setVisible] = useState(false); // State to control modal visibility

  // Inline logout handler with modal trigger
  const handleLogout = () => {
    setVisible(true); // Show confirmation modal
  };

  // Handle actual logout
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

  return (
    <div>
      <nav className="bg-gray-800 text-white p-4">
        <div className="flex justify-between items-center">
          <div className="font-bold">Bible App</div>
          <div className="flex gap-4">
            {/* Main Links */}
            <a href="/checklist" className="hover:underline">
              Checklist
            </a>
            <a href="/plan" className="hover:underline">
              Plan
            </a>

            {/* Auth Links */}
            {loading ? (
              <p>Loading...</p>
            ) : user ? (
              <>
                <span>Welcome, {user.email}</span>
                <button
                  className="text-red-500 hover:underline"
                  onClick={handleLogout} // Trigger the modal for logout
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <a href="/login" className="text-blue-500 hover:underline">
                  Login
                </a>
                <a href="/signup" className="text-blue-500 hover:underline">
                  Sign Up
                </a>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Modal for logout confirmation */}
      {visible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold text-center mb-4">
              Are you sure you want to log out?
            </h3>
            <div className="flex justify-end gap-4">
              <button
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400"
                onClick={() => setVisible(false)} // Close modal
              >
                Cancel
              </button>
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                onClick={confirmLogoutAction} // Confirm logout
              >
                Confirm Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
