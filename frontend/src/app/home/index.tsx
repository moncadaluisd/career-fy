import { Suspense, useState } from "react";

import { ApplicationsDataTable } from "@/components/aplications-data-table";
import { AppSidebar } from "@/components/app-sidebar";
import CurriculumManager from "@/components/curriculum-card";
import { GradientBackground } from "@/components/gradient-background";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { UrlInput } from "@/components/add-url-form";
import { FadeOut } from "@/components/animations/fade-out";
import { CreatingApply } from "@/components/creating-apply";
import { LoaderContainer } from "@/components/loader-container";

export default function Home() {

  const [isNewApply, setIsNewApply] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const handleNewApply = (value: boolean, url: string) => {
    setIsNewApply(value);
    setUrl(url);
  };

  return (
    <div className="[--header-height:calc(theme(spacing.14))] bg-transparent">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <div className="flex min-h-screen flex-col bg-slate-50">
              <GradientBackground />

              <UrlInput
                handleNewApply={handleNewApply}
                isNewApply={isNewApply}
              />

              <FadeOut isVisible={isNewApply}>
                <CreatingApply url={url} isNew={true} />
              </FadeOut>

              <FadeOut isVisible={!isNewApply}>
                <div className="flex-1 space-y-8 p-4 md:p-8 pt-6">
                  <div>
                    <Suspense fallback={<LoaderContainer />}>
                      <CurriculumManager />
                    </Suspense>
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
              </FadeOut>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}

