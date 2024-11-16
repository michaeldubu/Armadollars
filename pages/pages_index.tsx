'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import Image from 'next/image'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { Sparkles, Award, Calendar, DollarSign } from 'lucide-react'
import { ServerDashboard } from '@/components/ServerDashboard'
import { ManagerDashboard } from '@/components/ManagerDashboard'
import { AdminDashboard } from '@/components/AdminDashboard'

// Mock data (replace with actual data fetching in production)
const INITIAL_EMPLOYEES = [
  { id: 1, name: 'John Doe', role: 'server', armadollars: 100 },
  { id: 2, name: 'Jane Smith', role: 'server', armadollars: 75 },
  { id: 3, name: 'Bob Johnson', role: 'manager', armadollars: 150 },
  { id: 4, name: 'Alice Williams', role: 'admin', armadollars: 200 },
]

const INITIAL_TASKS = [
  { id: 1, name: 'Get Ice', armadollars: 5 },
  { id: 2, name: 'Refill Condiments', armadollars: 10 },
  { id: 3, name: 'Clean Section', armadollars: 15 },
  { id: 4, name: 'Did not complain for a whole shift', armadollars: 20 },
]

const INITIAL_SCHEDULES = [
  { id: 1, employeeId: 1, date: '2023-05-01', shift: 'Dinner', start: '16:00', end: '22:00' },
  { id: 2, employeeId: 2, date: '2023-05-01', shift: 'Lunch', start: '11:00', end: '15:00' },
]

function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault()
    const user = INITIAL_EMPLOYEES.find(emp => emp.name.toLowerCase() === username.toLowerCase())
    if (user) {
      onLogin(user)
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
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Welcome to Andy's Armadollars</CardTitle>
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

export default function AndyArmadollars() {
  const [user, setUser] = useState(null)
  const [employees, setEmployees] = useState(INITIAL_EMPLOYEES)
  const [tasks, setTasks] = useState(INITIAL_TASKS)
  const [schedules, setSchedules] = useState(INITIAL_SCHEDULES)

  const handleLogin = (userData) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#8B0000] to-[#A52A2A] p-8">
      <div className="container mx-auto">
        <header className="mb-8 flex flex-col md:flex-row items-center justify-between bg-white/10 p-6 rounded-lg backdrop-blur-sm">
          <div>
            <h1 className="text-4xl font-bold mb-2 text-white text-center md:text-left">Texas Roadhouse #647 - Andy's Armadollars</h1>
            <p className="text-xl mb-4 text-white/80 text-center md:text-left">Legendary Food, Legendary Service, Service with HEART</p>
          </div>
          <Image src="/Texas-Roadhouse-Logo.jpg" alt="Texas Roadhouse Logo" width={100} height={100} className="rounded-full border-4 border-white/50" />
        </header>
        {user ? (
          <>
            <div className="flex justify-between items-center mb-8 bg-white/10 p-4 rounded-lg backdrop-blur-sm">
              <p className="text-white text-lg">Howdy, {user.name}! Ready to be Proud, Present, Memorable, and Energetic?</p>
              <Button onClick={handleLogout} variant="outline" className="bg-white text-[#8B0000] hover:bg-gray-200 transition-colors duration-300">Logout</Button>
            </div>
            {user.role === 'server' && <ServerDashboard user={user} tasks={tasks} schedules={schedules} />}
            {user.role === 'manager' && <ManagerDashboard user={user} employees={employees} setEmployees={setEmployees} tasks={tasks} setTasks={setTasks} schedules={schedules} setSchedules={setSchedules} />}
            {user.role === 'admin' && <AdminDashboard user={user} employees={employees} tasks={tasks} setTasks={setTasks} />}
          </>
        ) : (
          <Login onLogin={handleLogin} />
        )}
        <footer className="mt-8 text-center text-sm text-white/80">
          <p>Texas Roadhouse #647 - 3623 Central Ave, Hot Springs, Arkansas</p>
          <p>Core Values: Passion, Partnership, Integrity, & Fun - All with a Purpose</p>
        </footer>
      </div>
    </div>
  )
}