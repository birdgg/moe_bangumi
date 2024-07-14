"use client";

import { GearIcon, HomeIcon } from "@radix-ui/react-icons";
import { ThemeSwitch } from "../theme/theme-switch";
import SidebarIcon from "./sidebar-icon";

const MENU = [
	{
		name: "Home",
		route: "/",
		Icon: HomeIcon,
	},
	{
		name: "Setting",
		route: "/setting",
		Icon: GearIcon,
	},
];

export function Sidebar() {
	return (
		<aside className="self-start sticky top-0 h-full w-16 border-r bg-background py-4">
			<div className="h-full flex flex-col justify-between">
				<nav className="flex flex-col items-center gap-4 px-2">
					{MENU.map((route) => (
						<SidebarIcon key={route.name} {...route} />
					))}
				</nav>
				<nav className="mt-auto flex flex-col items-center gap-1 px-2 py-4">
					<ThemeSwitch />
				</nav>
			</div>
		</aside>
	);
}
