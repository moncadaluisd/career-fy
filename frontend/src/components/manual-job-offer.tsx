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
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { Apply } from "@/interfaces/Apply";
import { createApply } from "@/services/appliesService";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";


const ApplyFormSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  url: yup.string().required("Url is required"),
  description: yup.string().required("Description is required"),
  status: yup.string().required("Status is required"),
  tags: yup.array().of(yup.string()),
  location: yup.string(),
  typeWork: yup.string(),
  salary: yup.string(),
  company: yup.string(),
});

export default function ModalManualJobOffer({
  onUploadSuccess,
}: {
  onUploadSuccess: () => void;
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const { register, handleSubmit } = useForm<{
    name: string;
    url: string;
    description: string;
    status: string;
    tags?: string[];
    location?: string;
    typeWork?: string;
    salary?: string;
    company?: string;
  }>({
    defaultValues: {
      name: "",
      url: "",
      description: "",
      status: "",
      tags: [],
      location: "",
      typeWork: "",
      salary: "",
      company: "",
    },
    resolver: yupResolver(ApplyFormSchema),
  });

  const mutation = useMutation({
    mutationFn: (data: Apply) => createApply(data),
    onSuccess: () => {
      toast.success("Job offer created");
      onUploadSuccess();
    },
    onError: () => {
      toast.error("Error creating job offer");
    },
  });

  const onSubmit = (data: {
    name: string;
    url: string;
    description: string;
    status: string;
    tags?: string[];
    location?: string;
    typeWork?: string;
    salary?: string;
    company?: string;
  }) => {
    mutation.mutate({
      name: data.name,
      description: data.description,
      status: data.status,
      tags: data.tags,
      location: data.location,
      typeWork: data.typeWork,
      salary: data.salary,
      company: data.company,
      url: data.url,
    });
  };

  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Create Job Offer
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Job Offer</DialogTitle>
          <DialogDescription>
            Create a new job offer and add relevant details.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="job-offer-name">Job Offer Name</Label>
            <Input
              id="job-offer-name"
              placeholder="e.g., Software Engineer Job Offer"
              {...register("name")}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="job-offer-name">Job Offer Name</Label>
            <Input
              id="job-offer-url"
              placeholder="e.g., https://www.linkedin.com/jobs/view/3724201901/"
              {...register("url")}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="job-offer-status">Status</Label>
            <Select id="job-offer-status" {...register("status")}>
              <SelectTrigger>
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="job-offer-description">Description</Label>
            <Textarea
              id="job-offer-description"
              placeholder="Add notes about this version..."
              {...register("description")}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="job-offer-tags">Tags</Label>
            <Select id="job-offer-tags" {...register("tags")}>
              <SelectTrigger>
                <SelectValue placeholder="Select tags" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="job-offer-location">Location</Label>
            <Input id="job-offer-location" {...register("location")} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="job-offer-typeWork">Type of Work</Label>
            <Input id="job-offer-typeWork" {...register("typeWork")} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="job-offer-salary">Salary</Label>
            <Input id="job-offer-salary" {...register("salary")} />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="job-offer-company">Company</Label>
            <Input id="job-offer-company" {...register("company")} />
          </div>
          
        </form>
        <DialogFooter>
          <Button variant="outline" onClick={() => setModalOpen(false)}>
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

