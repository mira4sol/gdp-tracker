'use client'

import { Button } from '@/components/ui/button'
import { login } from '../actions'

const LoginPage = () => {
  return (
    <div>
      <p>Login Page</p>
      <form action={login}>
        <Button type='submit'>Login with Google</Button>
      </form>
    </div>
  )
}

export default LoginPage
