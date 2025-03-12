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
import { ShowIframePdf } from "./show-iframe-pdf";
import { Link } from "react-router";

// Define a type for the CV items that extends the Curriculum interface
interface CVItem extends Curriculum {
  description?: string | undefined;
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
                  <DropdownMenuItem>
                    <Link to={`/curriculum/${cv._id}`}>View</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive"
                    onClick={() => handleDeleteCurriculum(cv._id || "")}
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
              </div>
              <Badge variant="secondary">
                {new Date(cv.createdAt).toLocaleDateString()}
              </Badge>
            </CardFooter>
          </Card>
        ))}

        {curriculums.length === 0 && (
          <div className="text-center text-muted-foreground col-span-full my-10">
            No curriculums found
          </div>
        )}
      </div>

      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-3xl h-[90vh]">
          <DialogHeader>
            <DialogTitle>{selectedCV?.name}</DialogTitle>
          </DialogHeader>
          <div className="flex-1 w-full h-full min-h-[600px] rounded-md border">
            <ShowIframePdf id={selectedCV?._id || ""} />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CurriculumManager;

