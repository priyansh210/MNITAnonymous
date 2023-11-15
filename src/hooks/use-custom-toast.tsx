import { buttonVariants } from '@/components/ui/Button'
import { toast } from '@/hooks/use-toast'
import Link from 'next/link'

export const useCustomToasts = () => {
  const loginToast = () => {
    const { dismiss } = toast({
      title: 'User not Logged in',
      description: 'Please login to create a community',
      variant: 'destructive',
      action: (
        <Link
          href='/sign-in'
          onClick={() => dismiss()}
          className={buttonVariants({ variant: 'outline' })}>
          Login
        </Link>
      ),

    })
  }

  return { loginToast }
}