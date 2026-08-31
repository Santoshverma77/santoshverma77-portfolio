import { forwardRef } from "react";

import { Link, useLocation } from "@/lib/router-compat";
import { cn } from "@/lib/utils";

type NavLinkCompatProps = Omit<React.ComponentProps<typeof Link>, "className"> & {
  className?: string;
  activeClassName?: string;
  pendingClassName?: string;
};

const NavLink = forwardRef<HTMLAnchorElement, NavLinkCompatProps>(
  ({ className, activeClassName, pendingClassName, to, ...props }, ref) => {
    const location = useLocation();
    const isActive = location.pathname === to;

    return (
      <Link
        ref={ref}
        to={to}
        className={cn(className, isActive && activeClassName)}
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
