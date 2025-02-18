import { GDPInterface } from '@/interfaces/models.interface'
import { apiResponse, httpRequest } from '../http.lib'

export const gdpRequests = {
  getAllGDP: async (
    page = 1,
    limit = 10,
    setLoading?: (loading: boolean) => void
  ) => {
    try {
      const res = await httpRequest(setLoading).get(
        `/gdp?page=${page}&limit=${limit}`
      )
      return apiResponse(
        true,
        'GDP data fetched successfully.',
        res?.data?.data
      )
    } catch (err: any) {
      return apiResponse(
        false,
        err?.response?.data?.message || err?.message || 'Error occurred.',
        err
      )
    }
  },

  getGDP: async (id: string, setLoading?: (loading: boolean) => void) => {
    try {
      const res = await httpRequest(setLoading).get(`/gdp/${id}`)
      return apiResponse(true, 'GDP fetched successfully.', res.data)
    } catch (err: any) {
      return apiResponse(
        false,
        err?.response?.data?.message || err?.message || 'Error occurred.',
        err
      )
    }
  },

  createGDP: async (
    data: Omit<GDPInterface, 'id' | 'created_at'>,
    setLoading?: (loading: boolean) => void
  ) => {
    try {
      const res = await httpRequest(setLoading).post('/gdp', data)
      return apiResponse(true, 'GDP created successfully.', res.data)
    } catch (err: any) {
      return apiResponse(
        false,
        err?.response?.data?.message || err?.message || 'Error occurred.',
        err
      )
    }
  },

  updateGDP: async (
    id: string,
    data: Partial<Omit<GDPInterface, 'id' | 'created_at'>>,
    setLoading?: (loading: boolean) => void
  ) => {
    try {
      const res = await httpRequest(setLoading).patch(`/gdp/${id}`, data)
      return apiResponse(true, 'GDP updated successfully.', res.data)
    } catch (err: any) {
      return apiResponse(
        false,
        err?.response?.data?.message || err?.message || 'Error occurred.',
        err
      )
    }
  },

  getTotalEarnings: async (
    timeframe?: 'all' | 'year' | 'month' | 'week',
    setLoading?: (loading: boolean) => void
  ) => {
    try {
      const url = timeframe
        ? `/gdp/analytics/earnings?timeframe=${timeframe}`
        : '/gdp/analytics/earnings'
      const res = await httpRequest(setLoading).get(url)
      return apiResponse(true, 'Total earnings fetched successfully.', res.data)
    } catch (err: any) {
      return apiResponse(
        false,
        err?.response?.data?.message || err?.message || 'Error occurred.',
        err
      )
    }
  },

  getGDPByGuild: async (setLoading?: (loading: boolean) => void) => {
    try {
      const res = await httpRequest(setLoading).get('/gdp/analytics/by-guild')
      return apiResponse(true, 'Guild GDP data fetched successfully.', res.data)
    } catch (err: any) {
      return apiResponse(
        false,
        err?.response?.data?.message || err?.message || 'Error occurred.',
        err
      )
    }
  },

  getGDPByCategory: async (setLoading?: (loading: boolean) => void) => {
    try {
      const res = await httpRequest(setLoading).get(
        '/gdp/analytics/by-category'
      )
      return apiResponse(
        true,
        'Category GDP data fetched successfully.',
        res.data
      )
    } catch (err: any) {
      return apiResponse(
        false,
        err?.response?.data?.message || err?.message || 'Error occurred.',
        err
      )
    }
  },

  getUniqueUsers: async (setLoading?: (loading: boolean) => void) => {
    try {
      const res = await httpRequest(setLoading).get('/gdp/analytics/users')
      return apiResponse(
        true,
        'Unique users count fetched successfully.',
        res.data
      )
    } catch (err: any) {
      return apiResponse(
        false,
        err?.response?.data?.message || err?.message || 'Error occurred.',
        err
      )
    }
  },

  getTotalGDPCount: async (setLoading?: (loading: boolean) => void) => {
    try {
      const res = await httpRequest(setLoading).get('/gdp/analytics/count')
      return apiResponse(
        true,
        'Total GDP count fetched successfully.',
        res.data
      )
    } catch (err: any) {
      return apiResponse(
        false,
        err?.response?.data?.message || err?.message || 'Error occurred.',
        err
      )
    }
  },
}
