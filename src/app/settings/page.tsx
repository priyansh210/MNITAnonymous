import { redirect } from 'next/navigation'

import { UserNameForm } from '@/components/UserNameForm'
import { authOptions, getAuthSession } from '@/lib/auth'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Label } from '@/components/ui/Label'
import Image from 'next/image'
import UserAvatar from '@/components/UserAvatar'

export const metadata = {
    title: 'Settings',
    description: 'Manage account and website settings.',
}

export default async function SettingsPage() {
    const session = await getAuthSession()

    if (!session?.user) {
        redirect(authOptions?.pages?.signIn || '/login')
    }

    return (
        <div className='max-w-4xl mx-auto py-12'>
            <div className='grid items-start gap-8'>
                <h1 className='font-bold text-3xl md:text-4xl'>Settings</h1>

                <Card>
                    <CardHeader>
                        <div className='flex justify-center items-center '>
                            <UserAvatar
                                className='h-20 w-20'
                                user={{
                                    name: session.user.name || null,
                                    image: session.user.image || null,
                                }} />
                        </div>

                        <CardTitle className='pt-4 font-bold flex justify-center items-center'>u/{session.user.username}</CardTitle>
                        <CardDescription className='flex justify-center'>
                            {session.user.name}
                        </CardDescription>
                        <CardDescription className='flex justify-center'>
                            {session.user.email}
                        </CardDescription>
                    </CardHeader>
                </Card>

                <div className='grid gap-10'>
                    <UserNameForm
                        user={{
                            id: session.user.id,
                            username: session.user.username || '',
                        }}
                    />
                </div>
            </div>
        </div>
    )
}