import { SidebarProvider } from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/app-sidebar";
import { GradientBackground } from "@/components/gradient-background";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getCurriculumById } from "@/services/curriculumService";
import { ShowIframePdf } from "@/components/show-iframe-pdf";

export default function CurriculumId() {
  const { id } = useParams();

  const { data: curriculumData } = useQuery({
    queryKey: ["curriculum", id],
    queryFn: () => getCurriculumById(id as string),
  });

  const curriculum = curriculumData?.data;
  return (
    <div className="[--header-height:calc(theme(spacing.14))] bg-transparent">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <div className="flex min-h-screen flex-col bg-slate-50 p-4">
              <GradientBackground />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="col-span-1">
                  {curriculum?._id && (
                    <div className="flex-1 w-full h-full min-h-[600px] rounded-md border">
                      <ShowIframePdf id={curriculum?._id} />
                    </div>
                  )}
                </div>
                <div className="col-span-1">
                  <h1 className="text-2xl font-bold">{curriculum?.name}</h1>
                  <p className="text-sm text-gray-500">
                    {curriculum?.description}
                  </p>
                </div>
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}

