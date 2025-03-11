import { useState } from "react";

import { CardApply } from "@/components/card-applie";
import { useParams } from "react-router";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getApply } from "@/services/appliesService";
import { Apply } from "@/interfaces/Apply";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SiteHeader } from "@/components/site-header";
import { AppSidebar } from "@/components/app-sidebar";
import { GradientBackground } from "@/components/gradient-background";
import { UrlInput } from "@/components/add-url-form";
import { FadeOut } from "@/components/animations/fade-out";
import { CardSelections } from "@/components/card-selections";
import CoverLetterManager from "@/components/coverltetter-applied";
import { Curriculum } from "@/interfaces/Curriculum";
import { generateCoverLetter } from "@/services/coverLetterService";
import { toast } from "sonner";
export default function ApplyId() {
  const { id } = useParams();

  const [curriculum, setCurriculum] = useState<Curriculum | null>(null);

  const { data: apply } = useQuery({
    queryKey: ["apply", id],
    queryFn: () => getApply(id as string),
  });

  const mutation = useMutation({
    mutationFn: async ({
      curriculumId,
      applyId,
    }: {
      curriculumId: string;
      applyId: string;
    }) => {
      const data = await generateCoverLetter({ curriculumId, applyId, isShort: true });
      return data.data;
    },
    onSuccess: (_data) => {
      console.log(_data);
      toast.success("Cover letter generated");
    },
    onError: (error) => {
      console.log(error);
      toast.error("Error creating apply");
    },
  });

  const handleCurriculumChange = (curriculum: Curriculum) => {
    setCurriculum(curriculum);
    if (curriculum && apply?.data?._id) {
      const curriculumId: string = curriculum._id;
      const applyId: string = apply.data._id;
      mutation.mutate({ curriculumId, applyId });
    }
  };

  const handleCurriculumCoverlettersChange = (curriculum: Curriculum | null) => {
    setCurriculum(curriculum);
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
                <CardSelections
                  isLoading={mutation.isPending}
                  onHandleCurriculumChange={handleCurriculumCoverlettersChange}
                  onGenerateCoverLetter={handleCurriculumChange}
                  curriculumSelected={curriculum}
                />
              </div>

              <div className="p-4">
                {apply?.data._id && (
                  <CoverLetterManager
                    curriculumId={curriculum?._id as string | null}
                    applyId={apply?.data?._id as string | null}
                  />
                )}
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}

