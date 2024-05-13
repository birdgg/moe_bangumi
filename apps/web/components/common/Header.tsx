"use client";
import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { useRouteTitle } from "@/app/(app)/routes";

export default function Header() {
  const title = useRouteTitle();
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
        <h1 className="text-xl font-semibold">{title}</h1>
      </header>
    </header>
  );
}
