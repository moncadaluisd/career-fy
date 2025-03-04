// this is a card that shows the information of the apply

import { Apply } from "@/interfaces/Apply";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Building2, Calendar, MapPin, Clock } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export function CardApply({ apply }: { apply: Apply }) {
  // Format the creation date to show as "X days/hours ago"

  const timeAgo = apply?.createdAt ? formatDistanceToNow(new Date(apply?.createdAt), {
    addSuffix: true,
  }) : "No date"

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">{apply?.name}</CardTitle>
          <Badge
            variant={
              apply?.status === "Offer"
                ? "default"
                : apply?.status === "Rejected"
                ? "destructive"
                : apply?.status === "Interview"
                ? "outline"
                : "secondary"
            }
          >
            {apply?.status}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="pb-2 space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Building2 className="h-4 w-4" />
          <span>{apply?.company}</span>
        </div>

        {apply?.location && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>{apply?.location}</span>
          </div>
        )}

        {apply?.typeWork && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{apply?.typeWork}</span>
          </div>
        )}

        {apply?.salary && (
          <p className="text-sm font-medium">
            Salary: <span className="text-green-600">{apply?.salary}</span>
          </p>
        )}

        {apply?.description && (
          <p className="text-sm">{apply?.description}</p>
        )}
      </CardContent>

      <CardFooter className="pt-2 border-t text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>Applied {timeAgo}</span>
        </div>
      </CardFooter>
    </Card>
  )
}

