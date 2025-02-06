import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DashboardProps {
  totalUsers: number
  totalArmadollars: number
}

export default function Dashboard({ totalUsers, totalArmadollars }: DashboardProps) {
  const [recentAwards, setRecentAwards] = useState([])

  useEffect(() => {
    const fetchRecentAwards = async () => {
      try {
        const response = await fetch('/api/stats')
        const data = await response.json()
        setRecentAwards(data.recentAwards)
      } catch (error) {
        console.error('Error fetching recent awards:', error)
      }
    }

    fetchRecentAwards()
  }, [])

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome to Andy's Armadollars</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalUsers}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Armadollars</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">{totalArmadollars}</p>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Recent Awards</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {recentAwards.map((award, index) => (
              <li key={index} className="mb-2">
                {award.amount} Armadollars awarded to Employee {award.employeeId}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
