import { cn } from "@/lib/utils";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Curriculum } from "@/interfaces/Curriculum";

export function CardCurriculum({
  curriculum,
  isSelected,
  onSelect,
}: {
  curriculum: Curriculum;
  isSelected: boolean;
  onSelect: (curriculum: Curriculum) => void;
}) {
  return (
    <Card
      className={cn(
        "cursor-pointer transition-colors duration-200",
        "hover:bg-muted/50",
        isSelected && "border-primary bg-muted"
      )}
      onClick={() => onSelect(curriculum)}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{curriculum.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">
          Status: <Badge variant="outline">{curriculum.status}</Badge>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-sm text-muted-foreground"></div>
        <Badge variant="default">
          {new Date(curriculum.createdAt).toLocaleDateString()}
        </Badge>
      </CardFooter>
    </Card>
  );
}

