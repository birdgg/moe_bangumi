"use client";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DesktopIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import * as React from "react";
import { Button } from "../ui/button";

export function ThemeSwitch() {
	const { setTheme, theme } = useTheme();
	const ThemeIcon =
		theme === "system" ? DesktopIcon : theme === "light" ? SunIcon : MoonIcon;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="none">
					<ThemeIcon className="h-6 w-6" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem onClick={() => setTheme("light")}>
					Light
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("dark")}>
					Dark
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme("system")}>
					System
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
