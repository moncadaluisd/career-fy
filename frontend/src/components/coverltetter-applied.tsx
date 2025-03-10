import { useState } from "react";
import { MoreHorizontal, FileText, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Coverletter } from "@/interfaces/Coverletter";
import { toast } from "sonner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  deleteCoverLetter,
  getConverLetters,
} from "@/services/coverLetterService";

// Define a type for the cover letter items that extends the Coverletter interface
interface CoverLetterItem extends Coverletter {
  companyName?: string;
  position?: string;
}

const CoverLetterManager = ({
  curriculumId,
  applyId,
}: {
  curriculumId: string | null;
  applyId: string | null;
}) => {
  const queryClient = useQueryClient();

  queryClient.invalidateQueries({ queryKey: ["coverletters"] });

  const { data: coverlettersResponse } = useQuery({
    queryKey: ["coverletters"],
    queryFn: () => getConverLetters(curriculumId, applyId),
  });

  const coverletters = coverlettersResponse?.data ?? [];

  const [selectedCoverLetter, setSelectedCoverLetter] =
    useState<CoverLetterItem | null>(
      coverletters.length > 0 ? coverletters[0] : null
    );
  const [previewOpen, setPreviewOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: (coverId: string) => deleteCoverLetter(coverId),
    onSuccess: () => {
      toast.success("Cover letter deleted");
    },
    onError: () => {
      toast.error("Error deleting cover letter");
    },
  });

  const handleDeleteCoverLetter = (coverId: string) => {
    mutation.mutate(coverId);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">My Cover Letters</h3>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {coverletters.map((coverLetter: CoverLetterItem) => (
          <Card key={coverLetter._id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Version: {coverLetter.version}
              </CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      setSelectedCoverLetter(coverLetter);
                      setPreviewOpen(true);
                    }}
                  >
                    Preview
                  </DropdownMenuItem>
                  <DropdownMenuItem>Download</DropdownMenuItem>
                  <DropdownMenuItem>Edit</DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleDeleteCoverLetter(coverLetter._id)}
                    className="text-destructive"
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                {coverLetter.text.substring(0, 100)}...
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  {coverLetter.isShort ? "Short version" : "Full version"}
                </span>
              </div>
            </CardFooter>
          </Card>
        ))}

        {coverletters.length === 0 && (
          <div className="text-center text-muted-foreground">
            No cover letters found
          </div>
        )}
      </div>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Software Engineer - Google</DialogTitle>
            <DialogDescription>
              Version {selectedCoverLetter?.version} • Created on{" "}
            </DialogDescription>
          </DialogHeader>
          {/** add button to copy the text small and in the right top of the cover letter*/}

          <div className="mt-0 p-4 rounded-md border bg-muted/50 max-h-[500px] overflow-y-auto relative">
            <Button
              variant="ghost"
              onClick={() => {
                navigator.clipboard.writeText(selectedCoverLetter?.text || "");
                toast.success("Copied to clipboard");
              }}
              className="absolute top-0 right-0"
              size="icon"
            >
              <Copy className="h-2 w-2" />
            </Button>
            {/** show the \n in the text not using <br /> beacuse is not working */}
            <p className="whitespace-pre-wrap">{selectedCoverLetter?.text}</p>
          </div>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setPreviewOpen(false)}>
              Close
            </Button>
            <Button>Download</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CoverLetterManager;

