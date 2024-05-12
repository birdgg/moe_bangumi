import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

interface Props {
  name: string;
  route: string;
  tooltip?: string;
  Icon: React.ComponentType<any>;
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
            "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8",
            isActive ? "text-accent-foreground" : ""
          )}
        >
          {isActive && (
            <motion.div
              layoutId="sidebaricon"
              className="absolute h-9 w-9 z-[-1] rounded-lg bg-accent"
            />
          )}
          <Icon className="h-5 w-5" />
          <span className="sr-only">{name}</span>
        </Link>
      </TooltipTrigger>
      <TooltipContent side="right">{name}</TooltipContent>
    </Tooltip>
  );
}
