'use client'

import RecentUsers from '@/components/users/recent-users'
import dynamic from 'next/dynamic'

const GuildAnalytics = dynamic(
  () => import('@/components/analytics/guild-gdp'),
  { ssr: false }
)

const CategoryAnalytics = dynamic(
  () => import('@/components/analytics/category-gdp'),
  { ssr: false }
)

const AnalyticsPage = () => {
  return (
    <div>
      <div className='px-4 sm:px-6 lg:px-10 py-6'>
        <section className='flex flex-col gap-4 bg-green-100 p-6 rounded-lg shadow-sm'>
          {/* <div className='flex  items-center gap-2 '>
            <h1 className='text-lg font-semibold text-gray-800'>Analytics</h1>
            <p className='text-gray-600 text-sm'>January 1 - January 11</p>
          </div> */}
          <div className='grid grid-cols-1  lg:grid-cols-2 gap-4 w-full '>
            <GuildAnalytics />
            <CategoryAnalytics />
          </div>
        </section>
        <RecentUsers />
      </div>
    </div>
  )
}

export default AnalyticsPage
