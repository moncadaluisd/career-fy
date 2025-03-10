import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { createCurriculum } from "@/services/curriculumService";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const uploadFormSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  notes: yup.string(),
  file: yup.mixed<File[]>().required("File is required"),
});

interface UploadForm {
  name: string;
  notes?: string;
  file: File;
}

export default function ModalUploadCV({
  onUploadSuccess,
}: {
  onUploadSuccess: () => void;
}) {
  const [uploadOpen, setUploadOpen] = useState(false);

  const { register, handleSubmit } = useForm<{
    name: string;
    notes?: string;
    file: File[];
  }>({
    defaultValues: {
      name: "",
      notes: "",
      file: undefined,
    },
    resolver: yupResolver(uploadFormSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: UploadForm) => createCurriculum(data),
    onSuccess: () => {
      toast.success("CV uploaded");
      setUploadOpen(false);
      onUploadSuccess();
    },
    onError: () => {
      toast.error("Error uploading CV");
    },
  });

  const onSubmit = (data: { name: string; notes?: string; file: File[] }) => {
    const file = data.file[0];
    mutation.mutate({
      name: data.name,
      notes: data.notes,
      file,
    });
  };

  return (
    <Dialog open={uploadOpen} onOpenChange={setUploadOpen}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload CV
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload New CV</DialogTitle>
          <DialogDescription>
            Upload a new CV and add relevant details.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="cv-name">CV Name</Label>
            <Input
              id="cv-name"
              placeholder="e.g., Software Engineer CV"
              {...register("name")}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cv-description">Description</Label>
            <Textarea
              id="cv-description"
              placeholder="Add notes about this version..."
              {...register("notes")}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cv-file">File</Label>
            <Input
              id="cv-file"
              type="file"
              accept=".pdf"
              {...register("file")}
            />
          </div>
        </form>
        <DialogFooter>
          <Button variant="outline" onClick={() => setUploadOpen(false)}>
            Cancel
          </Button>
          <Button
            disabled={mutation.isPending}
            onClick={handleSubmit(onSubmit)}
          >
            {mutation.isPending ? "Uploading..." : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

