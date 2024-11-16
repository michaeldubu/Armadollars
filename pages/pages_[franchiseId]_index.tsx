import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ServerDashboard } from '@/components/ServerDashboard'
import { ManagerDashboard } from '@/components/ManagerDashboard'
import { AdminDashboard } from '@/components/AdminDashboard'
import { KeyDashboard } from '@/components/KeyDashboard'
import { getFranchiseConfig, getUserData, login } from '@/lib/api'

export default function FranchiseArmadollars() {
  const router = useRouter()
  const { franchiseId } = router.query

  const [franchiseConfig, setFranchiseConfig] = useState(null)
  const [user, setUser] = useState(null)
  const [loginError, setLoginError] = useState('')

  useEffect(() => {
    if (franchiseId) {
      getFranchiseConfig(franchiseId as string).then(setFranchiseConfig).catch(console.error)
    }
  }, [franchiseId])

  const handleLogin = async (username: string, password: string) => {
    try {
      const userData = await login(franchiseId as string, username, password)
      setUser(userData)
      setLoginError('')
    } catch (error) {
      setLoginError('Invalid credentials')
    }
  }

  const handleLogout = () => {
    setUser(null)
  }

  if (!franchiseConfig) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8B0000] to-[#A52A2A] p-8">
      <div className="container mx-auto">
        <header className="mb-8 flex flex-col md:flex-row items-center justify-between bg-white/10 p-6 rounded-lg backdrop-blur-sm">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-white text-center md:text-left">
              {franchiseConfig.name} - Andy's Armadollars
            </h1>
            <p className="text-xl mb-4 text-white/80 text-center md:text-left">Legendary Food, Legendary Service, Service with HEART</p>
          </div>
          <Image src={franchiseConfig.logoUrl} alt={`${franchiseConfig.name} Logo`} width={100} height={100} className="rounded-full border-4 border-white/50" />
        </header>
        {user ? (
          <>
            <div className="flex justify-between items-center mb-8 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <p className="text-white text-lg">Howdy, {user.name}! Ready to be Proud, Present, Memorable, and Energetic?</p>
              <Button onClick={handleLogout} variant="outline" className="bg-white text-[#8B0000] hover:bg-gray-200 transition-colors duration-300">Logout</Button>
            </div>
            {user.role === 'server' && <ServerDashboard user={user} franchiseId={franchiseId as string} config={franchiseConfig} />}
            {user.role === 'key' && <KeyDashboard user={user} franchiseId={franchiseId as string} config={franchiseConfig} />}
            {user.role === 'manager' && <ManagerDashboard user={user} franchiseId={franchiseId as string} config={franchiseConfig} />}
            {user.role === 'admin' && <AdminDashboard user={user} franchiseId={franchiseId as string} config={franchiseConfig} />}
          </>
        ) : (
          <Login onLogin={handleLogin} error={loginError} />
        )}
        <footer className="mt-8 text-center text-sm text-white/80">
          <p>{franchiseConfig.address}</p>
          <p>Core Values: Passion, Partnership, Integrity, & Fun - All with a Purpose</p>
        </footer>
      </div>
    </div>
  )
}

function Login({ onLogin, error }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onLogin(username, password)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-[#F5DEB3] to-[#D2B48C] text-[#8B0000] shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Welcome to Andy's Armadollars</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-white/50 border-[#8B0000]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/50 border-[#8B0000]"
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button type="submit" className="w-full bg-[#8B0000] text-white hover:bg-[#A52A2A] transition-colors duration-300">
              Login to Earn Armadollars!
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}