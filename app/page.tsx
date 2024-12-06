'use client'

import { useState } from 'react'
import Image from 'next/image'
import Login from '@/components/Login'
import AdminDashboard from '@/components/AdminDashboard'
import ManagerDashboard from '@/components/ManagerDashboard'
import ServerDashboard from '@/components/ServerDashboard'
import KeyDashboard from '@/components/KeyDashboard'
import { Button } from "@/components/ui/button"

export default function Home() {
  const [user, setUser] = useState(null)

  const renderDashboard = () => {
    switch (user?.role) {
      case 'admin':
        return <AdminDashboard user={user} />
      case 'manager':
        return <ManagerDashboard user={user} />
      case 'server':
        return <ServerDashboard user={user} />
      case 'key':
        return <KeyDashboard user={user} />
      default:
        return <p className="text-white text-center text-2xl">No dashboard available for this role.</p>
    }
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      {user ? (
        <>
          <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
            <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
              Welcome, {user.name}!&nbsp;
              <code className="font-mono font-bold">Role: {user.role}</code>
            </p>
            <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
              <Button 
                onClick={() => setUser(null)} 
                className="bg-white text-black hover:bg-gray-200"
              >
                Logout
              </Button>
            </div>
          </div>

          <div className="relative flex place-items-center">
            <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
              src="/armadollars-logo.png"
              alt="Armadollars Logo"
              width={180}
              height={37}
              priority
            />
          </div>

          <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
            {renderDashboard()}
          </div>
        </>
      ) : (
        <>
          <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
            <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
              Welcome to Armadollars
            </p>
          </div>

          <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
            <Image
              className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
              src="/armadollars-logo.png"
              alt="Armadollars Logo"
              width={180}
              height={37}
              priority
            />
          </div>

          <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
            <Login setUser={setUser} />
          </div>
        </>
      )}
    </main>
  )
}
