"use client";

import { UserMenu } from "./user-menu";

export const MainNavigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 md:left-0 md:top-0 md:bottom-auto md:w-64 md:min-h-screen">
      <UserMenu />
    </nav>
  );
};
