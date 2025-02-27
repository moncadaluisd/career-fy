import { Card, CardContent } from "./ui/card";

export function CardAnalyzing({
  isDot,
  text,
  isLoading,
}: {
  isDot: boolean;
  text: string;
  isLoading: boolean;
}) {
  return (
    <Card className="bg-white/70 backdrop-blur-lg border border-slate-200/60 p-4 shadow-sm">
      <CardContent className="py-2">
        <div
          className={`text-sm text-muted-foreground flex items-center gap-2 ${
            isLoading ? "animate-pulse" : ""
          }`}
        >
          <div>{text}</div>
          {isDot && (
            <div className="">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

