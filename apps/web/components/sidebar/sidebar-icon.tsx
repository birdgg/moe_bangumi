"use client";

import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/libs/utils";
import type { IconProps } from "@radix-ui/react-icons/dist/types";
import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Props {
	name: string;
	route: string;
	tooltip?: string;
	Icon: React.ComponentType<IconProps>;
}

export default function SidebarIcon({ name, Icon, route }: Props) {
	const pathname = usePathname();
	const isActive = pathname === route;
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Link
					href={route}
					className={cn(
						"flex justify-center items-center h-9 w-full rounded-lg text-muted-foreground transition-colors hover:text-foreground",
						isActive ? "text-accent-foreground" : "",
					)}
				>
					{isActive && (
						<motion.div
							layoutId="sidebaricon"
							className="absolute h-9 w-9 z-[-1] rounded-lg bg-accent"
						/>
					)}
					<Icon className="h-6 w-6" />
					<span className="sr-only">{name}</span>
				</Link>
			</TooltipTrigger>
			<TooltipContent side="right">{name}</TooltipContent>
		</Tooltip>
	);
}
