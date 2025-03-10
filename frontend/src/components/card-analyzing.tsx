import { Card, CardContent } from "./ui/card";

export function CardAnalyzing({
  isDot,
  text,
  isLoading,
  isError,
}: {
  isDot: boolean;
  text: string;
  isLoading: boolean;
  isError: boolean;
}) {
  return (
    <Card className="bg-white/70 backdrop-blur-lg border border-slate-200/60 my-0 p-2 shadow-sm">
      <CardContent className="py-1">
        <div
          className={`text-sm text-muted-foreground flex items-center gap-2 ${
            isLoading && !isError ? "animate-pulse" : ""
          }`}
        >
          <div className={isError ? "text-red-500" : ""}>{text}</div>
          {isDot && (
            <div className="">
              <div
                className={`w-1.5 h-1.5 rounded-full ${
                  isError ? "bg-red-500" : "bg-green-500"
                }`}
              ></div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

