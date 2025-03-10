import { useState } from "react";
import { MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteCurriculum, getCurriculums } from "@/services/curriculumService";
import { Curriculum } from "@/interfaces/Curriculum";
import { ResponseApi } from "@/interfaces/ResponseApi";
import FormCurriculum from "./forms/form-curriculum";

// Define a type for the CV items that extends the Curriculum interface
interface CVItem extends Curriculum {
  description?: string;
  file?: string;
  usedIn?: number;
  date?: Date;
}

const CurriculumManager = () => {
  const { data: curriculumsResponse } = useQuery<ResponseApi<Curriculum[]>>({
    queryKey: ["curriculums"],
    queryFn: getCurriculums,
  });

  const queryClient = useQueryClient();

  const curriculums = curriculumsResponse?.data ?? [];

  // Transform curriculums data to match the expected format
  const cvs: CVItem[] = curriculums.map((curriculum: Curriculum) => ({
    ...curriculum,
    id: curriculum._id,
    description: "CV description", // Default description
    file: curriculum.path, // Use path as file URL
    date: curriculum.createdAt, // Use createdAt as date
    usedIn: curriculum.usedIn || 0,
  }));

  const [selectedCV, setSelectedCV] = useState<CVItem | null>(
    cvs.length > 0 ? cvs[0] : null
  );
  const [previewOpen, setPreviewOpen] = useState(false);

  const mutation = useMutation({
    mutationFn: (id: string) => deleteCurriculum(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["curriculums"] });
    },
  });

  const handleDeleteCurriculum = (id: string) => {
    mutation.mutate(id);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">My Curriculums</h3>
        <FormCurriculum
          onUploadSuccess={() => {
            queryClient.invalidateQueries({ queryKey: ["curriculums"] });
          }}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {cvs.map((cv: CVItem) => (
          <Card key={cv._id}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{cv.name}</CardTitle>
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
                      setSelectedCV(cv);
                      setPreviewOpen(true);
                    }}
                  >
                    Preview
                  </DropdownMenuItem>
                  <DropdownMenuItem>Download</DropdownMenuItem>
                  <DropdownMenuItem>Edit Details</DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => handleDeleteCurriculum(cv._id)}
                  >
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground">
                {cv.description || "No description available"}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Used in {cv.usedIn || 0} applications
              </div>
              <Badge variant="secondary">
                {new Date(cv.createdAt).toLocaleDateString()}
              </Badge>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-3xl h-[800px]">
          <DialogHeader>
            <DialogTitle>{selectedCV?.name}</DialogTitle>
            <DialogDescription>
              {selectedCV?.description || "No description available"}
            </DialogDescription>
          </DialogHeader>
          <div className="flex-1 w-full h-full min-h-[600px] rounded-md border">
            <iframe
              src={selectedCV?.path}
              className="w-full h-full rounded-md"
              title="CV Preview"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CurriculumManager;

