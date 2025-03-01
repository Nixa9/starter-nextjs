"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
]

const chartConfig = {
    desktop: {
        label: "Desktop",
        color: "hsl(var(--chart-1))",
    },
    mobile: {
        label: "Mobile",
        color: "hsl(var(--chart-2))",
    },
}

export function ActivityChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>User Activity</CardTitle>
                <CardDescription>
                    Desktop and mobile usage over the last 6 months
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
                    <BarChart data={chartData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={{ fill: 'rgb(128 128 128 / 0.1)', style: { zIndex: -1 } }}
                            content={<ChartTooltipContent />}
                        />
                        <Bar dataKey="desktop" fill={chartConfig.desktop.color} radius={4} />
                        <Bar dataKey="mobile" fill={chartConfig.mobile.color} radius={4} />
                    </BarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter>
                <div className="flex w-full items-start gap-2 text-sm border-t pt-4">
                    <div className="grid gap-2">
                        <div className="flex items-center gap-2 font-medium leading-none">
                            Revenue growth exceeded 35% <TrendingUp className="h-4 w-4 text-emerald-500" />
                        </div>
                        <div className="flex items-center gap-2 leading-none text-muted-foreground">
                            Q3 - Q4, 2023 Performance
                        </div>
                    </div>
                    <div className="ml-auto flex items-center rounded-full bg-primary/10 px-2 py-1">
                        <span className="text-xs font-medium text-primary">+35%</span>
                    </div>
                </div>
            </CardFooter>
        </Card>
    )
}