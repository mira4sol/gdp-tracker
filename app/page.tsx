'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import RecentUsers from '@/components/users/recent-users'
import { gdpRequests } from '@/lib/api_requests/gdp.request'
import { useEffect, useState } from 'react'

export default function Home() {
  const [analytics, setAnalytics] = useState({
    totalEarnings: '0',
    totalBounties: '0',
    totalUsers: '0',
  })
  const [loading, setLoading] = useState(true)

  const fetchAnalytics = async () => {
    try {
      // Fetch total earnings
      const earningsResponse = await gdpRequests.getTotalEarnings(
        'all',
        setLoading
      )

      // Fetch total GDP count (bounties)
      const gdpCountResponse = await gdpRequests.getTotalGDPCount(setLoading)

      // Fetch unique users
      const usersResponse = await gdpRequests.getUniqueUsers(setLoading)

      // Handle earnings response
      if (earningsResponse.success) {
        console.log('earningsResponse', earningsResponse.data?.data)
        setAnalytics((prev) => ({
          ...prev,
          totalEarnings: `$${Number(
            earningsResponse.data?.data
          ).toLocaleString()}`,
        }))
      }

      // Handle GDP count response
      if (gdpCountResponse.success) {
        setAnalytics((prev) => ({
          ...prev,
          totalBounties: gdpCountResponse.data?.data.toLocaleString(),
        }))
      }

      // Handle users response
      if (usersResponse.success) {
        setAnalytics((prev) => ({
          ...prev,
          totalUsers: usersResponse.data?.data.toLocaleString(),
        }))
      }
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const cards = [
    {
      title: 'Total Value Earned',
      value: loading ? '...' : analytics.totalEarnings,
    },
    {
      title: 'Total Bounties Won',
      value: loading ? '...' : analytics.totalBounties,
    },
    {
      title: 'Total Users Recorded',
      value: loading ? '...' : analytics.totalUsers,
    },
  ]

  return (
    <div className='px-4 sm:px-6 lg:px-10 py-6'>
      <section className='flex flex-col gap-4 bg-green-100 p-6 rounded-lg shadow-sm'>
        <h1 className='text-lg font-semibold text-gray-800'>Overview</h1>
        {/* <div className='flex flex-wrap items-center justify-between'>
          <p className='text-gray-600'>January 1 - January 11</p>
          <Button
            variant='outline'
            className='rounded-xl border border-green-800 bg-transparent text-green-800 hover:bg-green-100 focus:outline-none'
            aria-label='View more details'
          >
            View More
          </Button>
        </div> */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
          {cards.map((card, index) => (
            <Card key={index} className='w-full'>
              <CardHeader>
                <CardTitle className='text-lg font-semibold text-gray-400'>
                  {card.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className='text-2xl font-bold text-gray-700'>{card.value}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <RecentUsers />
    </div>
  )
}
