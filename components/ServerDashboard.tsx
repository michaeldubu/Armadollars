'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ServerDashboard({ user }) {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Server Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Welcome, {user.name}!</p>
        <p>This is the Server Dashboard. You can view your Armadollars balance and completed tasks here.</p>
      </CardContent>
    </Card>
  )
}
