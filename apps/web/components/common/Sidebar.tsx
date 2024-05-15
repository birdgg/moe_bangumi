"use client";
import SidebarIcon from "./SidebarIcon";
import ThemeToggleButton from "../theme/ThemeToggleButton";
import { appRoutes } from "@/app/(app)/routes";
import { Button } from "../ui/button";
import { Triangle } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="fixed inset-y left-0 z-20 w-16 flex h-full flex-col border-r">
      <div className="border-b p-2">
        <Button variant="outline" size="icon" aria-label="Home">
          <Triangle className="size-5 fill-foreground" />
        </Button>
      </div>
      <nav className="flex flex-col items-center gap-4 px-2 py-4">
        {appRoutes.map((route, index) => (
          <SidebarIcon key={index} {...route} />
        ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-1 px-2 py-4">
        <ThemeToggleButton />
      </nav>
    </aside>
  );
}
