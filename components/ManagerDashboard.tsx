'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ManagerDashboard({ user }) {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Manager Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Welcome, {user.name}!</p>
        <p>This is the Manager Dashboard. You can oversee your team's performance and Armadollars distribution here.</p>
      </CardContent>
    </Card>
  )
}
