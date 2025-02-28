"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

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
        <div className="bg-card p-6 rounded-xl border shadow-sm">
            <h3 className="font-semibold mb-4">User Activity</h3>
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
        </div>
    )
}