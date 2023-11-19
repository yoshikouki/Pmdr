"user client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Settings } from "lucide-react";
import Link from "next/link";
import { ThemeSelector } from "./theme-selector";

export const UserMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-14 w-full md:text-left md:justify-start"
        >
          <Settings className="md:mr-2" />
          <span className="sr-only md:not-sr-only">User Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="h-12 px-3" asChild>
          <Link href="/settings">
            <Settings className="mr-2" />
            Settings
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-transparent p-0">
          <ThemeSelector />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
