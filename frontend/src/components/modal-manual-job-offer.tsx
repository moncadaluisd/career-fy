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
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Upload, X } from "lucide-react";
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

  const [tagInput, setTagInput] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);

  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<{
    name: string;
    url: string;
    description: string;
    status: string;
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
      setModalOpen(false);
      reset();
      setTagInput("");
      setTags([]);
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
    console.log(data);
    mutation.mutate({
      name: data.name,
      description: data.description,
      status: data.status,
      tags: tags,
      location: data.location,
      typeWork: data.typeWork,
      salary: data.salary,
      company: data.company,
      url: data.url,
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    
    
    if (e.key === "Enter" && tagInput.trim() !== "") {
      e.preventDefault(); // Prevent form submission

      setTags((prevTags) => {
        const newTags = [...prevTags, tagInput];
        return newTags;
      });
      setTagInput(""); // Clear input field
    }
  }


  return (
    <Dialog open={modalOpen} onOpenChange={setModalOpen}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Create Job Offer
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
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
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="job-offer-name">Job Offer Name</Label>
            <Input
              id="job-offer-url"
              placeholder="e.g., https://www.linkedin.com/jobs/view/3724201901/"
              {...register("url")}
            />
            {errors.url && <p className="text-red-500 text-sm">{errors.url.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="job-offer-status">Status</Label>
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <Select 
                  onValueChange={field.onChange} 
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="applied">Applied</SelectItem>
                    <SelectItem value="interview">Interview</SelectItem>
                    <SelectItem value="offer">Offer</SelectItem>
                    <SelectItem value="rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
            {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="job-offer-description">Description</Label>
            <Textarea
              id="job-offer-description"
              placeholder="Add notes about this version..."
              {...register("description")}
            />
            {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="job-offer-tags">
              Tags <small>(Press Enter to add)</small>{" "}
            </Label>
            <Input
              id="job-offer-tags"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Press Enter to add tag"
            />
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <div
                  key={tag}
                  className="bg-gray-100 px-2 py-1 rounded-md flex items-center gap-2"
                >
                  {tag}
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTags(tags.filter((t) => t !== tag))}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="job-offer-location">Location</Label>
            <Input id="job-offer-location" {...register("location")} />
            {errors.location && <p className="text-red-500 text-sm">{errors.location.message}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="job-offer-typeWork">Type of Work</Label>
            <Input id="job-offer-typeWork" {...register("typeWork")} />
            {errors.typeWork && <p className="text-red-500 text-sm">{errors.typeWork.message}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="job-offer-salary">Salary</Label>
            <Input id="job-offer-salary" {...register("salary")} />
            {errors.salary && <p className="text-red-500 text-sm">{errors.salary.message}</p>}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="job-offer-company">Company</Label>
            <Input id="job-offer-company" {...register("company")} />
            {errors.company && <p className="text-red-500 text-sm ">{errors.company.message}</p>}
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
            {mutation.isPending ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

