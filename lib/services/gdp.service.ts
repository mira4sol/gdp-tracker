import { nanoid } from 'nanoid'
import { apiResponse } from '../http.lib'
import { createClient } from '../supabase/server'

export class WaitListService {
  static async joinWaitlist(payload: { name: string; email: string }) {
    try {
      const supabase = await createClient()
      const getWaitList = await supabase
        .from('gdp')
        .select('*')
        .eq('email', payload.email)

      if (getWaitList.error)
        return apiResponse(
          false,
          'user details',
          getWaitList?.error?.message || 'something went wrong'
        )
      if (getWaitList.data[0])
        return apiResponse(false, 'user already on waitlist', undefined)

      const { data: waitlist, error } = await supabase
        .from('gdp')
        .insert({ id: nanoid(21), ...payload })
        .select()

      if (error)
        return apiResponse(
          false,
          error.message || 'failed to join waitlist',
          error.message
        )

      return apiResponse(true, 'waitlist information', waitlist![0])
    } catch (error: any) {
      console.log(`joinWaitlist :`, error.message)
      return apiResponse(
        false,
        'failed joining waitlist',
        error.message || 'An unknown error occurred'
      )
    }
  }
  static async getWaitList() {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase.from('gdp').select('*')
      if (error)
        return apiResponse(false, 'failed to get waitlist', error.message)
      return apiResponse(true, 'waitlist', data)
    } catch (error: any) {
      console.log(`joinWaitlist :`, error.message)
      return apiResponse(
        false,
        'failed joining waitlist',
        error.message || 'An unknown error occurred'
      )
    }
  }

  static async getWaitListCount() {
    const supabase = await createClient()
    const { count, error } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })
    if (error) return 0
    return count || 0
  }
}
