'use client'

import { login } from '@/app/actions'
import { useAuth } from '@/contexts/auth.context'
import { PlusIcon } from 'lucide-react'
import { Button } from '../ui/button'

const AppBar = () => {
  // const [isLoggedin, setIsLoggedin] = useState(false)
  const { isLoggedIn } = useAuth()

  // const checkLogin = async () => {
  //   const supabase = await createClient()
  //   const { data, error } = await supabase.auth.getUser()
  //   if (error) {
  //     console.error(error)
  //   }
  //   if (data) {
  //     setIsLoggedin(true)
  //   }
  // }

  // useEffect(() => {
  //   checkLogin()
  // }, [])

  return (
    <div className='flex items-center w-full border-b border-black/10 justify-between py-6 px-10'>
      <button>Chapter Switcher btn</button>

      <div className='flex gap-5'>
        <p>Dashboard</p>
        <p>Analytics</p>
      </div>

      {isLoggedIn ? (
        <Button>
          Add GDP <PlusIcon />{' '}
        </Button>
      ) : (
        <Button onClick={login}>Login With Google </Button>
      )}
    </div>
  );
};

export default AppBar
