import { SidebarProvider } from "@/components/ui/sidebar";

import { AppSidebar } from "@/components/app-sidebar";
import { GradientBackground } from "@/components/gradient-background";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset } from "@/components/ui/sidebar";
import { useParams } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  generateCurriculumReview,
  getCurriculumById,
} from "@/services/curriculumService";
import { ShowIframePdf } from "@/components/show-iframe-pdf";

import { ChartScore } from "@/components/charts/chart-score";
import { CurriculumReview } from "@/interfaces/Curriculum";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { toast } from "sonner";
import { LoaderContainer } from "@/components/loader-container";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
export default function CurriculumId() {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data: curriculumData } = useQuery({
    queryKey: ["curriculum", id],
    queryFn: () => getCurriculumById(id as string),
  });

  const { mutate: generateReview, isPending } = useMutation({
    mutationFn: () => generateCurriculumReview(id as string),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["curriculum", id] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const curriculumLastReview: CurriculumReview | null =
    curriculumData?.data?.curriculumReview[0] || null;

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
                  <div className="flex justify-between">
                    <h1 className="text-2xl font-bold">{curriculum?.name}</h1>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        onClick={() => generateReview()}
                      >
                        Generate Review <Pencil />
                      </Button>
                    </div>
                  </div>

                  {isPending ? (
                    <LoaderContainer className="h-64" />
                  ) : (
                    <ChartScore score={curriculumLastReview?.score || 0} />
                  )}

                  <div className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Feedback</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {isPending ? (
                          <LoaderContainer className="h-64" />
                        ) : (
                          <p className="whitespace-pre-wrap">
                            {curriculumLastReview?.feedback}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </div>

                  <div className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Suggestions</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {isPending ? (
                          <LoaderContainer className="h-64" />
                        ) : (
                          <ReactMarkdown>{curriculumLastReview?.suggestions}</ReactMarkdown>
                        )}
                      </CardContent>
                    </Card>
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

