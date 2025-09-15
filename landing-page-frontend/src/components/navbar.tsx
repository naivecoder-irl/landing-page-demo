"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ThemeToggle from "./theme-toggle";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems: { href: string; label: string }[] = [
    { href: "/", label: "Home" },
    { href: "#insights", label: "Insights" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold">Landing</span>
            </Link>
          </div>

          {/* Desktop Navigation
           * when >= md, it becomes a flex row for desktop
           */}
          <div className="hidden items-center space-x-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                // className="text-foreground/80 transition-colors hover:text-foreground"
                className="group relative rounded-md px-3 py-2 text-foreground/90 transition hover:bg-foreground/10 hover:text-foreground"
              >
                {item.label}
              </Link>
            ))}
          </div>
          {/* Right side theme toggle button */}
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {/* Mobile menu button */}
            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation
         * when >= md, mobile elements are forced hidden
         */}
        <div className={cn("md:hidden", isOpen ? "block" : "hidden")}>
          <div className="space-y-1 border-t px-2 pt-2 pb-3 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block rounded-lg px-3 py-2 text-foreground/80 transition hover:bg-foreground/10 hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {/* <div className="space-y-2 px-3 py-2">
              <Button variant="outline" className="w-full sm:hidden">
                Sign In
              </Button>
              <Button className="w-full sm:hidden">Get Started</Button>
            </div> */}
          </div>
        </div>
      </div>
    </nav>
  );
}
