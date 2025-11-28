
"use client";

import * as React from "react";
import { PanelLeft } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type SidebarContext = {
  open: boolean;
  setOpen: (open: boolean) => void;
  isMobile: boolean;
  isCollapsed: boolean;
  toggleCollapsed: () => void;
};

const SidebarContext = React.createContext<SidebarContext | null>(null);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}

export function SidebarProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useMediaQuery("(max-width: 767px)");
  const [open, setOpen] = React.useState(false);
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  const toggleCollapsed = () => {
    setIsCollapsed((prev) => !prev);
  };
  
  React.useEffect(() => {
    if (isMobile) {
      setOpen(false);
      setIsCollapsed(false);
    }
  }, [isMobile]);

  const contextValue = React.useMemo(
    () => ({
      isMobile,
      open,
      setOpen,
      isCollapsed,
      toggleCollapsed,
    }),
    [isMobile, open, isCollapsed]
  );

  return (
    <SidebarContext.Provider value={contextValue}>
      {children}
    </SidebarContext.Provider>
  );
}

export const SidebarTrigger = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<typeof Button>
>(({ className, onClick, ...props }, ref) => {
  const { setOpen } = useSidebar();
  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      className={cn("h-8 w-8 shrink-0", className)}
      onClick={(event) => {
        onClick?.(event);
        setOpen(true);
      }}
      {...props}
    >
      <PanelLeft />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  );
});
SidebarTrigger.displayName = "SidebarTrigger";
