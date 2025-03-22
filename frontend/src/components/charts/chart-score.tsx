import { useState, useEffect } from "react";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

export interface ChartScoreProps {
  score: number;
  browser?: string;
  fill?: string;
}

const chartConfig = {
  score: {
    label: "Score",
  },
  safari: {
    label: "Safari",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

export function ChartScore({ score }: ChartScoreProps) {
  const [scoreData, setScoreData] = useState<ChartScoreProps[]>([]);
  const [scoreValue, setScoreValue] = useState<number>(0);

  useEffect(() => {
    setScoreData([
      { browser: "safari", score: score, fill: "var(--color-safari)" },
    ]);
  }, [score]);

  useEffect(() => {
    handleScoreChange(score);
  }, [score]);

  const handleScoreChange = (value: number) => {
    const fullCircle = 360;
    const scoreAngle = value * fullCircle / 100;
    setScoreValue(scoreAngle);
  };



  return (
    <Card className="flex flex-col mt-4">
      <CardHeader className="items-center pb-0">
        <CardTitle>Score of the curriculum</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <RadialBarChart
            data={scoreData}
            startAngle={0}
            endAngle={scoreValue}
            innerRadius={80}
            outerRadius={110}
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="none"
              className="first:fill-muted last:fill-background"
              polarRadius={[86, 74]}
            />
            <RadialBar dataKey="score" background cornerRadius={10} />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-4xl font-bold"
                        >
                          {scoreData[0].score.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Score
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

