import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../lib/utils";
import { PanelLeft } from "lucide-react";

// ------------------- CONTEXT -------------------
type SidebarContextType = {
  state: "expanded" | "collapsed";
  open: boolean;
  setOpen: (open: boolean) => void;
  toggleSidebar: () => void;
};
const SidebarContext = React.createContext<SidebarContextType | null>(null);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) throw new Error("useSidebar must be used within a SidebarProvider.");
  return context;
}

// ------------------- PROVIDER -------------------
export const SidebarProvider: React.FC<{ defaultOpen?: boolean; children: React.ReactNode }> = ({
  defaultOpen = true,
  children,
}) => {
  const [open, setOpen] = React.useState(defaultOpen);
  const state: "expanded" | "collapsed" = open ? "expanded" : "collapsed";

  const toggleSidebar = React.useCallback(() => setOpen((prev) => !prev), []);

  const value = React.useMemo(() => ({ state, open, setOpen, toggleSidebar }), [state, open]);

  return <SidebarContext.Provider value={value}>{children}</SidebarContext.Provider>;
};

// ------------------- SIDEBAR -------------------
export const Sidebar: React.FC<{
  side?: "left" | "right";
  collapsible?: "offcanvas" | "icon" | "none";
  className?: string;
  children: React.ReactNode;
}> = ({ side = "left", collapsible = "offcanvas", className, children }) => {
  const { state } = useSidebar();
  return (
    <div
      className={`top-0 bottom-0 z-10 flex flex-col bg-gray-900 text-white transition-all ${
        state === "collapsed" ? "w-12" : "w-64"
      } ${className ?? ""}`}
      data-side={side}
      data-state={state}
      data-collapsible={collapsible}
    >
      {children}
    </div>
  );
};
// --- SidebarTrigger ---
export const SidebarTrigger: React.FC<{ className?: string }> = ({ className }) => {
  const { toggleSidebar } = useSidebar();

  return (
    <button
      onClick={toggleSidebar}
      className={cn("m-2 p-2 text-primary rounded", className)}
    >
      <PanelLeft/>
    </button>
  );
};
// ------------------- SIDEBAR CONTENT -------------------
export const SidebarContent: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => <div className={`flex flex-col flex-1 overflow-auto ${className ?? ""}`}>{children}</div>;

// ------------------- SIDEBAR HEADER -------------------
export const SidebarHeader: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => <div className={`flex flex-col gap-2 p-2 ${className ?? ""}`}>{children}</div>;

// ------------------- SIDEBAR GROUP -------------------
export const SidebarGroup: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => <div className={`flex flex-col p-2 ${className ?? ""}`}>{children}</div>;

export const SidebarGroupLabel: React.FC<{ className?: string; children: React.ReactNode; asChild?: boolean }> = ({
  className,
  children,
  asChild = false,
}) => {
  const Comp = asChild ? Slot : "div";
  return (
    <Comp className={`text-xs font-medium text-gray-400 px-2 ${className ?? ""}`}>{children}</Comp>
  );
};

export const SidebarGroupContent: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => <div className={`flex flex-col gap-2 ${className ?? ""}`}>{children}</div>;

// ------------------- SIDEBAR MENU -------------------
export const SidebarMenu: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => <ul className={`flex flex-col gap-1 ${className ?? ""}`}>{children}</ul>;

export const SidebarMenuItem: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => <li className={`group relative ${className ?? ""}`}>{children}</li>;

// ------------------- SIDEBAR MENU BUTTON -------------------
const sidebarMenuButtonVariants = cva(
  "flex w-full items-center gap-2 rounded-md p-2 text-left text-sm outline-none hover:bg-gray-700 focus:ring-2",
  {
    variants: {
      variant: { default: "", outline: "border" },
      size: { default: "h-8 text-sm", sm: "h-7 text-xs" },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
);

export const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentProps<"button"> & { asChild?: boolean; isActive?: boolean } & VariantProps<typeof sidebarMenuButtonVariants>
>(({ asChild = false, isActive = false, variant = "default", size = "default", className, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      data-active={isActive}
      className={`${sidebarMenuButtonVariants({ variant, size })} ${className ?? ""}`}
      {...props}
    />
  );
});
SidebarMenuButton.displayName = "SidebarMenuButton";