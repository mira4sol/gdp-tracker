'use client'

import * as React from 'react'
import { Label, Pie, PieChart, Sector } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props
  const sin = Math.sin(-RADIAN * midAngle)
  const cos = Math.cos(-RADIAN * midAngle)
  const sx = cx + (outerRadius + 5) * cos
  const sy = cy + (outerRadius + 5) * sin
  const mx = cx + (outerRadius + 15) * cos
  const my = cy + (outerRadius + 15) * sin
  const ex = mx + (cos >= 0 ? 1 : -1) * 4
  const ey = my
  const textAnchor = cos >= 0 ? 'start' : 'end'

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor='middle' fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill='none'
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke='none' />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill='#333'
      >{`GDP ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill='#999'
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  )
}

const chartData = [
  { category: 'hackathons', gdp: 275, label: 'Good', fill: 'red' },
  { category: 'grants', gdp: 200, fill: 'green' },
  { category: 'bounties', gdp: 287, fill: 'orange' },
]

const chartConfig = {
  gdp: {
    label: 'gdp',
  },
  hackathons: {
    label: 'Hackathons',
    color: 'red',
  },
  grants: {
    label: 'Grants',
    color: 'green',
  },
  bounties: {
    label: 'Bounties',
    color: 'orange',
  },
} satisfies ChartConfig

export default function CategoryAnalytics() {
  const [isMobile, setIsMobile] = React.useState(window.innerWidth <= 768)

  React.useEffect(() => {
    // This code will only run on the client side
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768)
    }

    // Set initial state and add event listener
    handleResize()
    window.addEventListener('resize', handleResize)

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const totalgdp = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.gdp, 0)
  }, [])

  return (
    <Card className='flex flex-col w-full shadow-none border-none '>
      <CardHeader className='items-center pb-0'>
        <CardTitle>Total GDP by Category</CardTitle>

        {/* <CardDescription>$25,000 </CardDescription> */}
      </CardHeader>
      <CardContent className='flex-1 pb-0 '>
        <ChartContainer
          config={chartConfig}
          className='mx-auto aspect-square max-h-[300px] py-6 w-full h-full '
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
              innerRadius={60}
              strokeWidth={5}
              cx='50%'
              cy='50%'
              // activeShape={renderActiveShape}
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
              layout={isMobile ? 'horizontal' : 'vertical'}
              align={isMobile ? 'center' : 'left'}
              verticalAlign={isMobile ? 'bottom' : 'middle'}
              content={<ChartLegendContent />}
              className={isMobile ? 'flex-row' : 'flex-col'}
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
