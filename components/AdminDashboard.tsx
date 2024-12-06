'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminDashboard({ user }) {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Admin Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Welcome, {user.name}!</p>
        <p>This is the Admin Dashboard. You can manage all aspects of the Armadollars system here.</p>
      </CardContent>
    </Card>
  )
}
