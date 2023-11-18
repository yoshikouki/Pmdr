"user client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Settings } from "lucide-react";
import { ThemeSelector } from "./theme-selector";

export const UserMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-14">
          <Settings />
          <span className="sr-only">User Menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="h-12 px-3">
          <Settings className="mr-2" />
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem className="focus:bg-transparent p-0">
          <ThemeSelector />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
