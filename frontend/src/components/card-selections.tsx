import { Curriculum } from "@/interfaces/Curriculum";
import { useState } from "react";
import { CardCurriculum } from "./card-curriculum";
import { getCurriculums } from "@/services/curriculumService";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { toast } from "sonner";

export function CardSelections({
  onGenerateCoverLetter,
  curriculumSelected = null,
}: {
  onGenerateCoverLetter: (curriculum: Curriculum) => void;
  curriculumSelected: Curriculum | null;
}) {
  const [selectedCurriculum, setSelectedCurriculum] =
    useState<Curriculum | null>(curriculumSelected);

  const { data: curriculums } = useQuery({
    queryKey: ["curriculums"],
    queryFn: getCurriculums,
  });

  const handleSelectCurriculum = (curriculum: Curriculum) => {
    setSelectedCurriculum(curriculum);
  };

  const handleGenerateCoverLetter = () => {
    if (!selectedCurriculum) {
      toast.error("Please select a curriculum");
      return;
    }

    onGenerateCoverLetter(selectedCurriculum);
  };

  return (
    <Card>
      <CardTitle className="text-lg font-bold px-6 pt-6">
        Select Curriculums
      </CardTitle>
      <CardContent className="p-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 ">
          {curriculums?.data?.map((curriculum) => (
            <CardCurriculum
              key={curriculum._id}
              curriculum={curriculum}
              isSelected={selectedCurriculum?._id === curriculum._id}
              onSelect={handleSelectCurriculum}
            />
          ))}
        </div>
        <div className="w-full flex justify-end mt-4">
          <Button
            onClick={handleGenerateCoverLetter}
            disabled={!selectedCurriculum}
          >
            {" "}
            Generate CoverLetter
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

