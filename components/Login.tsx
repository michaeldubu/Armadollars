'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from 'next/image'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'

// Mock data (replace with actual data fetching in production)
const INITIAL_EMPLOYEES = [
  { id: 1, name: 'John Doe', role: 'server', armadollars: 100 },
  { id: 2, name: 'Jane Smith', role: 'server', armadollars: 75 },
  { id: 3, name: 'Bob Johnson', role: 'manager', armadollars: 150 },
  { id: 4, name: 'Alice Williams', role: 'admin', armadollars: 200 },
  { id: 5, name: 'Charlie Brown', role: 'key', armadollars: 125 },
]

export default function Login({ setUser }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim()) {
      alert('Please enter a username')
      return
    }
    const foundUser = INITIAL_EMPLOYEES.find(emp => emp.name.toLowerCase() === username.toLowerCase())
    if (foundUser) {
      setUser(foundUser)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    } else {
      alert('Invalid credentials')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-md mx-auto bg-gradient-to-br from-[#F5DEB3] to-[#D2B48C] text-[#8B0000] shadow-lg">
        <CardHeader className="space-y-2">
          <div className="w-32 h-32 mx-auto mb-4">
            <Image
              src="/armadollars-logo.png"
              alt="Armadollars Logo"
              width={128}
              height={128}
              className="rounded-full"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Welcome to Armadollars</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
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
            <Button type="submit" className="w-full bg-[#8B0000] text-white hover:bg-[#A52A2A] transition-colors duration-300">
              Login to Earn Armadollars!
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
