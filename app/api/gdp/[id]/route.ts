import { GDPService } from '@/lib/services/gdp.service'
import { updateGdpSchema } from '@/lib/validations/gdp.zod'

export const GET = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params
    const response = await GDPService.getGDP(id)
    return Response.json(response)
  } catch (error: any) {
    return Response.json(
      { success: false, message: error.message },
      { status: 400 }
    )
  }
}

export const PATCH = async (
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const { id } = await params
    const body = await request.json()
    const validatedData = updateGdpSchema.parse(body)

    const response = await GDPService.updateGDP(id, validatedData)
    return Response.json(response)
  } catch (error: any) {
    return Response.json(
      { success: false, message: error.message },
      { status: 400 }
    )
  }
}
