import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import React from 'react'
import { Bar, BarChart, CartesianGrid, Cell, XAxis, YAxis } from 'recharts'

function HorizontalGraph() {
  return (
    <div className="w-full xl:w-1/2 h-full py-1">
            <Card className="bg-transparent h-full p-2">
              <CardHeader>
                <CardTitle>Most Watched Manga</CardTitle>
                <CardDescription>
                  Top 5 manga by total views this month
                </CardDescription>
              </CardHeader>
              <CardContent className="px-2 sm:p-2">
                <ChartContainer
                  config={{
                    views: {
                      label: "Total Views",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="aspect-auto h-[273px] w-full"
                >
                  <BarChart
                    accessibilityLayer
                    data={[
                      { manga: "One Piece", views: 15420 },
                      { manga: "Naruto", views: 12350 },
                      { manga: "Demon Slayer", views: 11200 },
                      { manga: "Jujutsu Kaisen", views: 10800 },
                      { manga: "Attack on Titan", views: 9650 },
                    ]}
                    layout="vertical"
                    margin={{
                      left: 12,
                      right: 20,
                      top: 12,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid horizontal={false} />
                    <XAxis 
                      type="number"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                    />
                    <YAxis
                      type="category"
                      dataKey="manga"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      width={110}
                      fontSize={14}
                      fontWeight={600}
                    />
                    <ChartTooltip
                      content={
                        <ChartTooltipContent
                          className="w-[200px]"
                          labelFormatter={(value) => `${value}`}
                          formatter={(value) => [`${value.toLocaleString()} views`, "Total Views"]}
                        />
                      }
                    />
                    <Bar
                      dataKey="views"
                      radius={[0, 4, 4, 0]}
                    >
                      <Cell fill="#8b5cf6" />
                      <Cell fill="#ec4899" />
                      <Cell fill="#eab308" />
                      <Cell fill="#22c55e" />
                      <Cell fill="#3b82f6" />
                      <Cell fill="#f97316" />
                      <Cell fill="#ef4444" />
                      <Cell fill="#06b6d4" />
                      <Cell fill="#a855f7" />
                      <Cell fill="#10b981" />
                    </Bar>
                  </BarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
  )
}

export default HorizontalGraph