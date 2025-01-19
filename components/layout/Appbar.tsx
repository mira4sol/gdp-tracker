'use client'

import { login } from '@/app/actions'
import { useAuth } from '@/contexts/auth.context'
import { PlusIcon } from 'lucide-react'
import { Button } from '../ui/button'
import Link from 'next/link'

const AppBar = () => {
  // const [isLoggedin, setIsLoggedin] = useState(false)
  const { isLoggedIn } = useAuth()

  return (
    <div className='flex items-center w-full border-b border-black/10 justify-between py-6 px-10'>
      <button>Chapter Switcher btn</button>

      <div className='flex gap-5'>
        <Link href={"/"}>Dashboard</Link>
        <Link href={"/analytics"}>Analytics</Link>
      </div>

      {isLoggedIn ? (
        <Button>
          Add GDP <PlusIcon />{' '}
        </Button>
      ) : (
        <Button onClick={login}>Login With Google </Button>
      )}
    </div>
  )
}

export default AppBar
