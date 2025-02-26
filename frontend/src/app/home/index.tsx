import { ApplicationsDataTable } from "@/components/aplications-data-table";
import { AppSidebar } from "@/components/app-sidebar";
import CurriculumManager from "@/components/curriculum-card";
import { GradientBackground } from "@/components/gradient-background";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { UrlInput } from "@/components/add-url-form";
export default function Home() {
  return (
    <div className="[--header-height:calc(theme(spacing.14))] bg-transparent">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <div className="flex min-h-screen flex-col bg-slate-50">
              <GradientBackground />

              <UrlInput />

              <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
               
                <div>
                  <CurriculumManager />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-4">
                    Recent Applications
                  </h3>
                  <div className="bg-white/70 backdrop-blur-lg p-4 rounded-lg">
                    <ApplicationsDataTable />
                  </div>
                </div>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}

