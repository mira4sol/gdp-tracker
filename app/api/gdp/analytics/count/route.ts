import { GDPService } from '@/lib/services/gdp.service'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const response = await GDPService.getTotalGDPCount()
    return NextResponse.json(response)
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    )
  }
}
