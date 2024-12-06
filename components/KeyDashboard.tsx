'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function KeyDashboard({ user }) {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Key Personnel Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Welcome, {user.name}!</p>
        <p>This is the Key Personnel Dashboard. You have access to special features and reports here.</p>
      </CardContent>
    </Card>
  )
}
