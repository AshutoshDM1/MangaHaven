import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import React from 'react'
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from 'recharts'
import { chartData } from '../constant/graph';

function VerticalGraph() {

    const chartConfig = {
        views: {
          label: "Page Views",
        },
        desktop: {
          label: "Desktop",
          color: "hsl(var(--chart-1))",
        },
        mobile: {
          label: "Mobile",
          color: "hsl(var(--chart-2))",
        },
      } satisfies ChartConfig;

      const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("desktop");

    const total = React.useMemo(
        () => ({
          desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
          mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
        }),
        []
      );

  return (
    <div className="w-full xl:w-1/2  py-1">
            <Card className="bg-transparent">
              <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
                <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
                  <CardTitle>Manga Views</CardTitle>
                  <CardDescription>
                    Showing total views for the last 30 days
                  </CardDescription>
                </div>
                <div className="flex">
                  {["desktop", "mobile"].map((key) => {
                    const chart = key as keyof typeof chartConfig;
                    return (
                      <button
                        key={chart}
                        data-active={activeChart === chart}
                        className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                        onClick={() => setActiveChart(chart)}
                      >
                        <span className="text-xs text-muted-foreground">
                          {chartConfig[chart].label}
                        </span>
                        <span className="text-lg font-bold leading-none sm:text-3xl">
                          {total[key as keyof typeof total].toLocaleString()}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </CardHeader>
              <CardContent className="px-2 sm:p-6">
                <ChartContainer
                  config={chartConfig}
                  className="aspect-auto h-[250px] w-full"
                >
                  <BarChart
                    accessibilityLayer
                    data={chartData}
                    margin={{
                      left: 12,
                      right: 12,
                    }}
                  >
                    <CartesianGrid vertical={false} />
                    <XAxis
                      dataKey="date"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      minTickGap={32}
                      tickFormatter={(value) => {
                        const date = new Date(value);
                        return date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        });
                      }}
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          className="w-[150px]"
                          nameKey="views"
                          labelFormatter={(value) => {
                            return new Date(value).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            });
                          }}
                        />
                      }
                    />
                    <Bar
                      dataKey={activeChart}
                      fill={`var(--color-${activeChart})`}
                    />
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
  )
}

export default VerticalGraph