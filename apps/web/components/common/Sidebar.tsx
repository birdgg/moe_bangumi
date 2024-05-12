"use client";
import SidebarIcon from "./SidebarIcon";
import ThemeToggleButton from "../theme/ThemeToggleButton";
import { appRoutes } from "@/app/(app)/routes";

export default function Sidebar() {
  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        {appRoutes.map((route, index) => (
          <SidebarIcon key={index} {...route} />
        ))}
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-4">
        <ThemeToggleButton />
      </nav>
    </aside>
  );
}
