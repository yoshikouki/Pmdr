"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { UserMenu } from "./user-menu";

export const MainNavigation = () => {
  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 flex p-4",
        "md:left-0 md:top-0 md:bottom-auto md:flex-col md:w-64 md:min-h-screen"
      )}
    >
      <div className="flex-1">
        <Button
          variant="ghost"
          className="h-14 w-full md:text-left md:justify-start"
        >
          WIP
        </Button>
      </div>
      <div>
        <UserMenu />
      </div>
    </nav>
  );
};
