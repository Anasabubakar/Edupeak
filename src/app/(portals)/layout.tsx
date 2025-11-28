
import { MainHeader } from "@/components/main-header";
import { MainSidebar } from "@/components/main-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function PortalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="h-screen w-full overflow-hidden flex bg-background">
        <MainSidebar />
        <div className="flex flex-1 flex-col overflow-y-auto">
          <MainHeader />
          <main className="flex-1 p-4 pt-6 md:p-6 lg:p-8">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
