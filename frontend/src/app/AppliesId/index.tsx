import { CardApply } from "@/components/card-applie";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getApply } from "@/services/appliesService";
import { Apply } from "@/interfaces/Apply";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/site-header";
import { AppSidebar } from "@/components/app-sidebar";
import { GradientBackground } from "@/components/gradient-background";
import { UrlInput } from "@/components/add-url-form";
import { FadeOut } from "@/components/animations/fade-out";
import { CardSelections } from "@/components/card-selections";
export default function ApplyId() {
  const { id } = useParams();
  const { data: apply } = useQuery({
    queryKey: ["apply", id],
    queryFn: () => getApply(id as string),
  });
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
                handleNewApply={() => {}}
                isNewApply={false}
                url={apply?.data?.url as string}
              />

              <div className="p-4">
                <FadeOut isVisible={true}>
                  <CardApply apply={apply?.data as Apply} />;
                </FadeOut>
             </div>

              <div className="p-4">
                <CardSelections />
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}

