import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { motion } from 'framer-motion'

export function KeyDashboard({ user, employees, tasks }) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) && emp.role === 'server'
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-[#F5DEB3] to-[#D2B48C] text-[#8B0000] shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">Key Dashboard - Texas Roadhouse #647</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Label htmlFor="search">Search Servers</Label>
            <Input
              id="search"
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-white/50 border-[#8B0000] mt-1"
            />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Armadollars</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredEmployees.map(employee => (
                <TableRow key={employee.id}>
                  <TableCell>{employee.name}</TableCell>
                  <TableCell>{employee.armadollars}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-[#8B0000] text-white hover:bg-[#A52A2A] transition-colors duration-300">View Tasks</Button>
                      </DialogTrigger>
                      <DialogContent className="bg-[#F5DEB3] text-[#8B0000]">
                        <DialogHeader>
                          <DialogTitle>{employee.name}'s Tasks</DialogTitle>
                        </DialogHeader>
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Task</TableHead>
                              <TableHead>Armadollars</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {tasks.map(task => (
                              <TableRow key={task.id}>
                                <TableCell>{task.name}</TableCell>
                                <TableCell>{task.armadollars}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </motion.div>
  )
}