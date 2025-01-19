import { apiResponse, httpRequest } from '../http.lib'

export const authRequests = {
  loginWithGoogle: async (setLoading?: (loading: boolean) => void) => {
    try {
      const res = await httpRequest(setLoading).get(`/auth/oauth`, {
        baseURL: '/',
      })

      return apiResponse(true, 'Login with google successfully.', res.data)
    } catch (err: any) {
      return apiResponse(
        false,
        err?.response?.data?.message || err?.message || 'Error occurred.',
        err
      )
    }
  },
}
