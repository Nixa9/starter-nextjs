"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"

const trendData = [
    { name: "Week 1", sales: 400, profit: 240 },
    { name: "Week 2", sales: 300, profit: 139 },
    { name: "Week 3", sales: 520, profit: 280 },
    { name: "Week 4", sales: 450, profit: 218 },
    { name: "Week 5", sales: 600, profit: 380 },
]

const chartConfig = {
    sales: {
        label: "Sales",
        color: "var(--chart-1)",  // Remove hsl()
    },
    profit: {
        label: "Profit",
        color: "var(--chart-2)",  // Remove hsl()
    },
}

export function TrendChart() {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Weekly Performance</CardTitle>
                <CardDescription>
                    Sales and profit trends over the last 5 weeks
                </CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <AreaChart
                        data={trendData}
                        margin={{
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="name"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="dot" />}
                        />
                        <Area
                            dataKey="profit"
                            type="natural"
                            fill={`hsl(${chartConfig.profit.color})`}
                            fillOpacity={0.4}
                            stroke={`hsl(${chartConfig.profit.color})`}
                            stackId="a"
                        />
                        <Area
                            dataKey="sales"
                            type="natural"
                            fill={`hsl(${chartConfig.sales.color})`}
                            fillOpacity={0.4}
                            stroke={`hsl(${chartConfig.sales.color})`}
                            stackId="a"
                        />
                    </AreaChart>
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