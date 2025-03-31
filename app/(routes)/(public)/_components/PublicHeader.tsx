"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CircleUserRound, SquareMenu } from "lucide-react";
import CurrentTime from "./CurrentTime";
import NavigationLinks from "./NavigationLinks";
import Barangay174Logo from "@/components/logo/Barangay174Logo";
import { useState } from "react";

export default function PublicHeader() {
  const [isNavigationLinksOpen, setIsNavigationLinksOpen] = useState(false);

  return (
    // header wrapper
    <div className="p-4">
      {/* header */}
      <div className="bg-primary p-4 rounded-md shadow-md flex items-center justify-between relative">
        {/* icon and barangay name */}
        <div className="flex gap-2 items-center">
          <Barangay174Logo size={60} />
          <h1 className="text-xl font-bold text-background">
            Barangay 174 Operations and Monitoring Hub
          </h1>
        </div>
        <CurrentTime />
        {/* buttons wrapper */}
        <div className="flex gap-2 items-center">
          {/* login button */}
          <Link
            href="/login"
            className="bg-background text-primary px-4 py-2 rounded-full font-semibold flex gap-2 items-center"
          >
            <CircleUserRound />
            LOGIN
          </Link>
          {/* toggle nav */}
          <Button
            onClick={() => setIsNavigationLinksOpen((prev) => !prev)}
            className="cursor-pointer"
          >
            <SquareMenu className="size-6" />
          </Button>
        </div>
        <NavigationLinks isOpen={isNavigationLinksOpen} />
      </div>
    </div>
  );
}
