import { Suspense } from "react";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/site-header";
import { AppSidebar } from "@/components/app-sidebar";
import { GradientBackground } from "@/components/gradient-background";

import { FadeOut } from "@/components/animations/fade-out";
import { CurriculumDataTable } from "@/components/tables/curriculum-data-table";
import { LoaderContainer } from "@/components/loader-container";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Curriculums() {


  return (
    <div className="[--header-height:calc(theme(spacing.14))] bg-transparent">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <div className="flex min-h-screen flex-col bg-slate-50">
              <GradientBackground />

              <div className="p-4">
                <FadeOut isVisible={true}>
                  <Suspense fallback={<LoaderContainer className="h-64" />}>
                  <Card>
                    <CardHeader>
                      <CardTitle>Curriculums</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CurriculumDataTable />
                    </CardContent>
                  </Card>
                  </Suspense>
                </FadeOut>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}

