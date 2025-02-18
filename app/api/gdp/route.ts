import { GDPService } from '@/lib/services/gdp.service'
import { createGdpSchema, gdpQuerySchema } from '@/lib/validations/gdp.zod'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const validatedQuery = gdpQuerySchema.parse({
      page: searchParams.get('page'),
      limit: searchParams.get('limit'),
    })

    const response = await GDPService.getAllGDP(
      validatedQuery.page,
      validatedQuery.limit
    )
    return NextResponse.json(response)
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createGdpSchema.parse(body)

    const response = await GDPService.createGDP(validatedData)
    return NextResponse.json(response)
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    )
  }
}
