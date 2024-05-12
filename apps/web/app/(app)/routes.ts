import { Home, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

export const appRoutes = [
  {
    name: "Home",
    route: "/",
    Icon: Home,
  },
  {
    name: "Settings",
    route: "/settings",
    Icon: Settings,
  },
];

export const useRouteTitle = () => {
  const pathname = usePathname();
  const route = appRoutes.find((route) => route.route === pathname);
  return route?.name || "Not Found";
};
