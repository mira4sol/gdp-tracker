import { GDPService } from '@/lib/services/gdp.service'
import { timeframeSchema } from '@/lib/validations/gdp.zod'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const timeframe = searchParams.get('timeframe')

    if (timeframe) {
      timeframeSchema.parse(timeframe)
    }

    const response = await GDPService.getTotalEarnings(
      timeframe as 'all' | 'year' | 'month' | 'week'
    )
    return NextResponse.json(response)
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    )
  }
}
