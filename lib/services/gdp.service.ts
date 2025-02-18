import { GDPInterface } from '@/interfaces/models.interface'
import { apiResponse } from '../http.lib'
import { createClient } from '../supabase/server'

export class GDPService {
  static async getAllGDP(page = 1, limit = 10) {
    try {
      const supabase = await createClient()
      const offset = (page - 1) * limit

      const { data, error, count } = await supabase
        .from('gdp')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)

      if (error)
        return apiResponse(false, 'Failed to fetch GDP data', error.message)

      return apiResponse(true, 'GDP data retrieved', {
        data,
        total: count,
        page,
        limit,
      })
    } catch (error: any) {
      return apiResponse(false, 'Error fetching GDP data', error.message)
    }
  }

  static async getGDP(id: string) {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('gdp')
        .select('*')
        .eq('id', id)
        .single()

      if (error) return apiResponse(false, 'Failed to fetch GDP', error.message)

      return apiResponse(true, 'GDP retrieved', data)
    } catch (error: any) {
      return apiResponse(false, 'Error fetching GDP', error.message)
    }
  }

  static async createGDP(payload: Omit<GDPInterface, 'id' | 'created_at'>) {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('gdp')
        .insert({ ...payload })
        .select()
        .single()

      if (error)
        return apiResponse(false, 'Failed to create GDP', error.message)

      return apiResponse(true, 'GDP created successfully', data)
    } catch (error: any) {
      return apiResponse(false, 'Error creating GDP', error.message)
    }
  }

  static async updateGDP(
    id: string,
    payload: Partial<Omit<GDPInterface, 'id' | 'created_at'>>
  ) {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase
        .from('gdp')
        .update(payload)
        .eq('id', id)
        .select()
        .single()

      if (error)
        return apiResponse(false, 'Failed to update GDP', error.message)

      return apiResponse(true, 'GDP updated successfully', data)
    } catch (error: any) {
      return apiResponse(false, 'Error updating GDP', error.message)
    }
  }

  static async getTotalEarnings(timeframe?: 'all' | 'year' | 'month' | 'week') {
    try {
      const supabase = await createClient()
      let query = supabase.from('gdp').select('amount')

      if (timeframe && timeframe !== 'all') {
        const now = new Date()
        const startDate = new Date()

        switch (timeframe) {
          case 'year':
            startDate.setFullYear(now.getFullYear() - 1)
            break
          case 'month':
            startDate.setMonth(now.getMonth() - 1)
            break
          case 'week':
            startDate.setDate(now.getDate() - 7)
            break
        }

        query = query.gte('created_at', startDate.toISOString())
      }

      const { data, error } = await query

      if (error)
        return apiResponse(
          false,
          'Failed to calculate total earnings',
          error.message
        )

      const total = data.reduce((sum, item) => sum + parseFloat(item.amount), 0)
      return apiResponse(true, 'Total earnings calculated', total)
    } catch (error: any) {
      return apiResponse(
        false,
        'Error calculating total earnings',
        error.message
      )
    }
  }

  static async getUniqueUsers() {
    try {
      const supabase = await createClient()
      const { data, error } = await supabase.from('gdp').select('name')

      if (error)
        return apiResponse(false, 'Failed to fetch unique users', error.message)

      return apiResponse(true, 'Unique users retrieved', data.length)
    } catch (error: any) {
      return apiResponse(false, 'Error fetching unique users', error.message)
    }
  }

  static async getTotalGDPCount() {
    try {
      const supabase = await createClient()
      const { count, error } = await supabase
        .from('gdp')
        .select('*', { count: 'exact', head: true })

      if (error)
        return apiResponse(false, 'Failed to get GDP count', error.message)

      return apiResponse(true, 'GDP count retrieved', count)
    } catch (error: any) {
      return apiResponse(false, 'Error getting GDP count', error.message)
    }
  }

  static async getGDPByGuild() {
    try {
      const supabase = await createClient()
      const guilds = ['development', 'writing', 'content', 'design']
      const { data, error } = await supabase
        .from('gdp')
        .select('guild, amount')
        .in('guild', guilds)

      if (error)
        return apiResponse(false, 'Failed to fetch GDP by guild', error.message)

      const guildTotals = guilds.reduce((acc, guild) => {
        const guildData = data.filter((item) => item.guild === guild)
        const total = guildData.reduce(
          (sum, item) => sum + parseFloat(item.amount),
          0
        )
        return { ...acc, [guild]: total }
      }, {} as Record<string, number>)

      return apiResponse(true, 'GDP by guild retrieved', guildTotals)
    } catch (error: any) {
      return apiResponse(false, 'Error fetching GDP by guild', error.message)
    }
  }

  static async getGDPByCategory() {
    try {
      const supabase = await createClient()
      const categories = ['hackathon', 'bounty', 'grant']
      const { data, error } = await supabase
        .from('gdp')
        .select('category, amount')
        .in('category', categories)

      if (error)
        return apiResponse(
          false,
          'Failed to fetch GDP by category',
          error.message
        )

      const categoryTotals = categories.reduce((acc, category) => {
        const categoryData = data.filter((item) => item.category === category)
        const total = categoryData.reduce(
          (sum, item) => sum + parseFloat(item.amount),
          0
        )
        return { ...acc, [category]: total }
      }, {} as Record<string, number>)

      return apiResponse(true, 'GDP by category retrieved', categoryTotals)
    } catch (error: any) {
      return apiResponse(false, 'Error fetching GDP by category', error.message)
    }
  }
}
