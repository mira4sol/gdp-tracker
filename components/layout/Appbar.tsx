'use client'

import { login } from '@/app/actions'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { useAuth } from '@/contexts/auth.context'
import { Menu, PlusIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import Logo from '../../public/logo.png'
import { Button } from '../ui/button'
import { AddUserDialog } from '../users/add-user'

type NavItem = {
  label: string
  href: string
}

const AppBar = () => {
  const { isLoggedIn, user } = useAuth()
  const pathname = usePathname()
  const [canAddGDP, setCanAddGDP] = useState(false)

  useEffect(() => {
    console.log('user', user)
    setCanAddGDP(
      isLoggedIn && (user?.role === 'admin' || user?.role === 'moderator')
    )
  }, [isLoggedIn, user?.role])

  const navItems: NavItem[] = [
    { label: 'Dashboard', href: '/' },
    { label: 'Analytics', href: '/analytics' },
  ]

  return (
    <div className='flex items-center w-full border-[#D9D9D9] border-b-4 justify-between py-3 px-4 sm:px-6 lg:px-8'>
      <Link href='/' className='flex-shrink-0'>
        <Image
          src={Logo}
          alt='Logo'
          width={130}
          height={130}
          className='w-20 h-auto sm:w-32'
        />
      </Link>

      <div className='hidden md:flex items-center gap-5'>
        {navItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className={`border border-[#017F35] py-2 px-7 rounded-full text-[#000000] font-semibold
               ${pathname === item.href ? '  bg-[#A7D3B980]' : 'bg-white '}`}
          >
            {item.label}
          </Link>
        ))}
      </div>

      <div className='flex items-center gap-4'>
        {isLoggedIn ? (
          canAddGDP && (
            <AddUserDialog
              customTrigger={
                <Button className='hidden sm:flex'>
                  Add GDP <PlusIcon className='ml-2 h-4 w-4 ' />
                </Button>
              }
            />
          )
        ) : (
          <Button onClick={login} className='hidden sm:flex'>
            Login With Google
          </Button>
        )}

        <Sheet>
          <SheetTrigger asChild>
            <Button variant='outline' size='icon' className='md:hidden'>
              <Menu className='h-8 w-8' />
              <span className='sr-only'>Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side='right' className='w-[240px] sm:w-[300px]'>
            <nav className='flex flex-col gap-4'>
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`font-medium py-2 px-3 rounded-md transition-colors ${
                    pathname === item.href ? '  bg-[#A7D3B980]' : 'bg-white '
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              {isLoggedIn ? (
                canAddGDP && (
                  <Button size='sm' className='justify-start'>
                    Add GDP <PlusIcon className='ml-2 h-4 w-4' />
                  </Button>
                )
              ) : (
                <Button onClick={login} className='justify-start'>
                  Login With Google
                </Button>
              )}
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  )
}

export default AppBar
