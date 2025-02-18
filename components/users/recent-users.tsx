'use client'

import { gdpRequests } from '@/lib/api_requests/gdp.request'
import { Notify } from 'notiflix'
import { useEffect, useState } from 'react'
import { Button } from '../ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { AddUserDialog } from './add-user'
const RecentUsers = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)

  const fetchRecentGDP = async (pageNum = 1) => {
    const response = await gdpRequests.getAllGDP(pageNum, 10, setLoading)

    if (!response.success) {
      console.log('error occurred', response.message)
      Notify.failure(response.message)
      return
    }

    const formattedData = response.data?.data?.map((item: any) => ({
      username: item.name,
      description: item.description,
      guild: item.guild,
      category: item.category || 'N/A',
      amount: `$${item.amount}`,
      date: new Date(item.created_at).toLocaleDateString(),
    }))

    // Check if we've reached the end of the data
    if (!formattedData || formattedData.length < 10) {
      setHasMore(false)
    }

    // Append new data to existing data
    setData(pageNum === 1 ? formattedData : [...data, ...formattedData])
  }

  const handleLoadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchRecentGDP(nextPage)
  }

  useEffect(() => {
    fetchRecentGDP()
  }, [])

  return (
    <div className=' py-6'>
      <section className='bg-white p-6 rounded-lg shadow-sm'>
        <div className='flex justify-between items-center'>
          <h1 className='text-lg font-semibold text-gray-800 mb-4'>
            Recent Added
          </h1>
          <AddUserDialog />
        </div>
        <Table className='min-w-[700px]'>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead>Bounty Description</TableHead>
              <TableHead>Guild</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className='text-right'>Amount</TableHead>
              <TableHead className='text-right'>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? // Skeleton rows
                [...Array(5)].map((_, index) => (
                  <TableRow key={`skeleton-${index}`}>
                    <TableCell>
                      <div className='h-4 w-24 bg-gray-200 rounded animate-pulse'></div>
                    </TableCell>
                    <TableCell>
                      <div className='h-4 w-48 bg-gray-200 rounded animate-pulse'></div>
                    </TableCell>
                    <TableCell>
                      <div className='h-4 w-20 bg-gray-200 rounded animate-pulse'></div>
                    </TableCell>
                    <TableCell>
                      <div className='h-4 w-20 bg-gray-200 rounded animate-pulse'></div>
                    </TableCell>
                    <TableCell className='text-right'>
                      <div className='h-4 w-16 bg-gray-200 rounded animate-pulse ml-auto'></div>
                    </TableCell>
                    <TableCell className='text-right'>
                      <div className='h-4 w-24 bg-gray-200 rounded animate-pulse ml-auto'></div>
                    </TableCell>
                  </TableRow>
                ))
              : data.map((item: any, index: number) => (
                  <TableRow key={index}>
                    <TableCell className='font-medium'>
                      {item.username}
                    </TableCell>
                    <TableCell>{item?.description}</TableCell>
                    <TableCell>{item?.guild}</TableCell>
                    <TableCell>{item?.category}</TableCell>
                    <TableCell className='text-right'>{item?.amount}</TableCell>
                    <TableCell className='text-right'>{item?.date}</TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
        <div className='mt-4 flex justify-center'>
          {hasMore && (
            <Button
              variant='outline'
              className='rounded-xl border border-green-800 bg-transparent text-green-800 hover:bg-green-100 focus:outline-none'
              aria-label='View more users'
              onClick={handleLoadMore}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'View More'}
            </Button>
          )}
        </div>
      </section>
    </div>
  )
}

export default RecentUsers
