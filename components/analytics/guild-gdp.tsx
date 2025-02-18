'use client'

import { gdpRequests } from '@/lib/api_requests/gdp.request'
import * as React from 'react'
import { useEffect, useState } from 'react'
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


const chartConfig = {
  development: {
    label: 'Development',
    color: '#4A90E2', // blue
  },
  writing: {
    label: 'Writing',
    color: '#50C878', // emerald green
  },
  content: {
    label: 'Content',
    color: '#9B59B6', // purple
  },
  design: {
    label: 'Design',
    color: '#E74C3C', // red
  },
} satisfies ChartConfig

interface ChartDataItem {
  guild: string
  gdp: number
  fill: string
}

export default function GuildAnalytics() {
  const [loading, setLoading] = useState(false)
  const [chartData, setChartData] = useState<ChartDataItem[]>([])

  useEffect(() => {
    const fetchGuildData = async () => {
      const response = await gdpRequests.getGDPByGuild(setLoading)
      if (response.success && response.data) {
        const formattedData = Object.entries(response.data?.data).map(
          ([guild, gdp]) => ({
            guild,
            gdp: Number(gdp),
            fill:
              chartConfig[guild as keyof typeof chartConfig]?.color || '#000',
          })
        )
        setChartData(formattedData)
      }
    }
    fetchGuildData()
  }, [])

  const totalgdp = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.gdp, 0)
  }, [chartData])

  return (
    <Card className='flex flex-col w-full shadow-none border-none  '>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Overall GDP across all guilds</CardTitle>
        {/* <CardDescription>${totalgdp.toLocaleString()}</CardDescription> */}
      </CardHeader>
      <CardContent className='flex-1 pb-0 h-full relative '>
        {loading ? (
          <div className='flex justify-center items-center h-[300px]'>
            <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary' />
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className='mx-auto aspect-square h-[400px] py-6  max-sm:py-2 w-full '
          >
            <PieChart className='h-full '>
              <ChartTooltip
                cursor={true}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={chartData}
                dataKey='gdp'
                nameKey='guild'
                cx="50%"
                cy="50%"
                innerRadius={80}
                outerRadius={100}
                strokeWidth={10}
              >
                <Label
                  className='hidden'
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
                className={'flex-row flex-wrap max-sm:gap-[2px]'}
              />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  )
}
