"use client";
import { useState } from "react";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import { DarkModeProvider } from "./context/DarkModeContext";

export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <DarkModeProvider>
      <div className="flex flex-col min-h-screen">
        {/* Top Navigation */}
        <Nav className="" />

        {/* Main Grid Layout */}
        <div className="flex-grow grid grid-cols-5 gap-5">
          {/* Left Section (Hidden on mobile) */}
          <aside className="hidden md:block p-4 col-span-1">
            Left Section
          </aside>

          {/* Center Content */}
          <main className="bg-white p-4 col-span-5 md:col-span-3">
            <Hero />
          </main>

          {/* Right Section (Hidden on mobile) */}
          <aside className="hidden md:block p-4 col-span-1">
            Right Section
          </aside>
        </div>

        {/* Footer */}
        <footer className="bg-gray-800 text-white py-4 text-center">
          Footer Content
        </footer>

        {/* Side Drawer for Mobile */}
        <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-transform transform ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"} md:hidden`}>
          <div className="bg-white w-full h-full p-4">
            <button onClick={toggleDrawer} className="text-black">
              Close
            </button>
            <div className="mt-4">
              Left Section
            </div>
          </div>
        </div>

        {/* Drawer Toggle Button for Mobile */}
        <button onClick={toggleDrawer} className="fixed bottom-4 right-4 bg-gray-800 text-white p-2 rounded-full md:hidden">
          Toggle Drawer
        </button>
      </div>
    </DarkModeProvider>
  );
}