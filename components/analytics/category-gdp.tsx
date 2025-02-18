'use client'

import * as React from 'react'
import { Label, Pie, PieChart } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    ChartConfig,
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from '@/components/ui/chart'
import { gdpRequests } from '@/lib/api_requests/gdp.request'
import { useEffect, useState } from 'react'

const chartConfig = {
    gdp: {
        label: 'gdp',
        color: 'blue',
    },
    hackathon: {
        label: 'Hackathons',
        color: 'red',
    },
    grant: {
        label: 'Grants',
        color: 'green',
    },
    bounty: {
        label: 'Bounties',
        color: 'orange',
    },
} satisfies ChartConfig

interface ChartDataItem {
    category: string
    gdp: number
    fill: string
}

export default function CategoryAnalytics() {
    const [loading, setLoading] = useState(false)
    const [chartData, setChartData] = useState<ChartDataItem[]>([])

    useEffect(() => {
        const fetchCategoryData = async () => {
            const response = await gdpRequests.getGDPByCategory(setLoading)
            if (response.success && response.data) {
                // console.log('response.data', response.data)
                const formattedData = Object.entries(response.data?.data).map(
                    ([category, gdp]) => ({
                        category,
                        gdp: Number(gdp),
                        fill:
                            chartConfig[category as keyof typeof chartConfig]?.color ||
                            '#000',
                    })
                )
                setChartData(formattedData)
            }
        }
        fetchCategoryData()
    }, [])

    const totalgdp = React.useMemo(() => {
        return chartData.reduce((acc, curr) => acc + curr.gdp, 0)
    }, [chartData])

    return (
        <Card className='flex flex-col w-full shadow-none border-none '>
            <CardHeader className='items-center pb-0'>
                <CardTitle>Total GDP by Category</CardTitle>
                {/* <CardDescription>$25,000 </CardDescription> */}
            </CardHeader>
            <CardContent className='flex-1 pb-0 '>
                {loading ? (
                    <div className='flex justify-center items-center h-[300px]'>
                        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
                    </div>
                ) : (
                    <ChartContainer
                        config={chartConfig}
                        className='mx-auto aspect-square h-[400px] py-6 w-full  '
                    >
                        <PieChart className='h-full '>
                            <ChartTooltip
                                cursor={true}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Pie
                                data={chartData}
                                dataKey='gdp'
                                nameKey='category'
                                innerRadius={80}
                                outerRadius={100}
                                strokeWidth={10}
                                cx='50%'
                                cy='50%'
                            >
                                <Label
                                    content={({ viewBox }) => {
                                        if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                                            return (
                                                <text
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    textAnchor='middle'
                                                    dominantBaseline='middle'
                                                >
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={viewBox.cy}
                                                        className='fill-foreground text-3xl font-bold'
                                                    >
                                                        ${totalgdp.toLocaleString()}
                                                    </tspan>
                                                    <tspan
                                                        x={viewBox.cx}
                                                        y={(viewBox.cy || 0) + 24}
                                                        className='fill-muted-foreground'
                                                    >
                                                        Total GDP
                                                    </tspan>
                                                </text>
                                            )
                                        }
                                    }}
                                />
                            </Pie>
                            <ChartLegend
                                content={<ChartLegendContent />}
                                className={'flex-row flex-wrap'}
                            />
                        </PieChart>
                    </ChartContainer>
                )}
            </CardContent>
        </Card>
    )
}
