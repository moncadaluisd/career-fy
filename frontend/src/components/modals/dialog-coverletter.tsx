import { useState } from "react";

import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { toast } from "sonner";
import { Copy, Loader2 } from "lucide-react";
import { Coverletter } from "@/interfaces/Coverletter";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { regenerateCoverLetter } from "@/services/coverLetterService";
import { useMutation } from "@tanstack/react-query";
import { ScrollArea } from "../ui/scroll-area";

export const DialogCoverletter = ({
  previewOpen,
  setPreviewOpen,
  selectedCoverLetter,
  setSelectedCoverLetter,
}: {
  previewOpen: boolean;
  setPreviewOpen: (open: boolean) => void;
  selectedCoverLetter: Coverletter | null;
  setSelectedCoverLetter: (coverLetter: Coverletter) => void;
}) => {
  const [coverLetterText, setCoverLetterText] = useState("");

  const mutation = useMutation({
    mutationFn: (message: string) => {
      const id = selectedCoverLetter?._id;
      if (!id) {
        throw new Error("Cover letter id is required");
      }
      return regenerateCoverLetter(id, message);
    },
    onSuccess: (data) => {
      console.log(data);
      setCoverLetterText("");
      setSelectedCoverLetter(data.data);
      toast.success("Cover letter regenerated");
    },
    onError: () => {
      toast.error("Error regenerating cover letter");
    },
  });

  const handleRegenerate = async () => {
    mutation.mutateAsync(coverLetterText);
  };

  return (
    <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
      <DialogContent className="max-w-3xl h-[95vh]">
        <DialogHeader>
          <DialogTitle>{selectedCoverLetter?.curriculum?.name}</DialogTitle>
          <DialogDescription>
            Version {selectedCoverLetter?.version} • Created on{" "}
          </DialogDescription>
        </DialogHeader>
        {/** add button to copy the text small and in the right top of the cover letter*/}
        {selectedCoverLetter?.message &&
          selectedCoverLetter?.message.map((message) => (
            <div
              key={message._id}
              className="my-4 p-4  rounded-md border bg-muted/50 max-h-[500px] overflow-y-auto relative"
            >
              <Button
                variant="ghost"
                onClick={() => {
                  navigator.clipboard.writeText(message?.message || "");
                  toast.success("Copied to clipboard");
                }}
                className="absolute top-0 right-0"
                size="icon"
              >
                <Copy className="h-2 w-2" />
              </Button>
              {/** show the \n in the text not using <br /> beacuse is not working */}
              <p className="whitespace-pre-wrap">{message?.text}</p>
            </div>
          ))}
        <ScrollArea className="h-full">
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
        </ScrollArea>
        <div>
          <Label>
            Message{" "}
            <small className="text-muted-foreground">
              If you want to make a change to the cover letter, you can write a
              message here
            </small>
          </Label>
          <Textarea
            value={coverLetterText}
            onChange={(e) => setCoverLetterText(e.target.value)}
          />
        </div>
        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={() => setPreviewOpen(false)}>
            Close
          </Button>
          <Button
            onClick={handleRegenerate}
            disabled={mutation.isPending}
            className="flex items-center gap-2"
          >
            {mutation.isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Regenerating...
              </>
            ) : (
              "Regenerate"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

