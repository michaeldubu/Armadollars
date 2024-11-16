import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { AlertCircle, CheckCircle2, XCircle } from 'lucide-react'

type Complaint = {
  id: number;
  date: string;
  employeeName: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved';
}

export function AdminDashboard({ user, employees, tasks, setTasks }) {
  const [complaints, setComplaints] = useState<Complaint[]>([
    { id: 1, date: '2023-05-01', employeeName: 'John Doe', description: 'Issue with scheduling', status: 'open' },
    { id: 2, date: '2023-05-02', employeeName: 'Jane Smith', description: 'Conflict with coworker', status: 'in-progress' },
    { id: 3, date: '2023-05-03', employeeName: 'Bob Johnson', description: 'Equipment malfunction', status: 'resolved' },
  ])
  const [newComplaint, setNewComplaint] = useState({ employeeName: '', description: '' })

  const addComplaint = () => {
    if (newComplaint.employeeName && newComplaint.description) {
      const newId = Math.max(...complaints.map(c => c.id)) + 1
      const complaint = {
        id: newId,
        date: new Date().toISOString().split('T')[0],
        employeeName: newComplaint.employeeName,
        description: newComplaint.description,
        status: 'open' as const,
      }
      setComplaints([...complaints, complaint])
      setNewComplaint({ employeeName: '', description: '' })
    }
  }

  const updateComplaintStatus = (id: number, status: 'open' | 'in-progress' | 'resolved') => {
    setComplaints(complaints.map(complaint =>
      complaint.id === id ? { ...complaint, status } : complaint
    ))
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="text-yellow-500" />
      case 'in-progress':
        return <CheckCircle2 className="text-blue-500" />
      case 'resolved':
        return <XCircle className="text-green-500" />
      default:
        return null
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto bg-gradient-to-br from-[#F5DEB3] to-[#D2B48C] text-[#8B0000] shadow-lg">
      <CardHeader>
        <CardTitle className="text-3xl font-bold text-center">Admin Dashboard - Texas Roadhouse #647</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="complaints">
          <TabsList className="bg-[#D4AF37] w-full justify-center">
            <TabsTrigger value="complaints" className="data-[state=active]:bg-[#8B0000] data-[state=active]:text-white transition-colors duration-300">
              Complaints
            </TabsTrigger>
            <TabsTrigger value="tasks" className="data-[state=active]:bg-[#8B0000] data-[state=active]:text-white transition-colors duration-300">
              Tasks
            </TabsTrigger>
            <TabsTrigger value="employees" className="data-[state=active]:bg-[#8B0000] data-[state=active]:text-white transition-colors duration-300">
              Employees
            </TabsTrigger>
          </TabsList>
          <TabsContent value="complaints">
            <h3 className="text-2xl font-semibold mb-4 text-center">Complaints Management</h3>
            <div className="mb-4">
              <h4 className="text-xl font-semibold mb-2">Add New Complaint</h4>
              <div className="space-y-2">
                <Input
                  placeholder="Employee Name"
                  value={newComplaint.employeeName}
                  onChange={(e) => setNewComplaint({ ...newComplaint, employeeName: e.target.value })}
                  className="bg-white/50 border-[#8B0000]"
                />
                <Textarea
                  placeholder="Complaint Description"
                  value={newComplaint.description}
                  onChange={(e) => setNewComplaint({ ...newComplaint, description: e.target.value })}
                  className="bg-white/50 border-[#8B0000]"
                />
                <Button onClick={addComplaint} className="w-full bg-[#8B0000] text-white hover:bg-[#A52A2A] transition-colors duration-300">
                  Add Complaint
                </Button>
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Employee</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {complaints.map((complaint) => (
                  <TableRow key={complaint.id}>
                    <TableCell>{complaint.date}</TableCell>
                    <TableCell>{complaint.employeeName}</TableCell>
                    <TableCell>{complaint.description}</TableCell>
                    <TableCell className="flex items-center">
                      {getStatusIcon(complaint.status)}
                      <span className="ml-2">{complaint.status}</span>
                    </TableCell>
                    <TableCell>
                      <select
                        value={complaint.status}
                        onChange={(e) => updateComplaintStatus(complaint.id, e.target.value as 'open' | 'in-progress' | 'resolved')}
                        className="bg-white/50 border-[#8B0000] rounded px-2 py-1"
                      >
                        <option value="open">Open</option>
                        <option value="in-progress">In Progress</option>
                        <option value="resolved">Resolved</option>
                      </select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="tasks">
            <h3 className="text-2xl font-semibold mb-4 text-center">Task Management</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Task</TableHead>
                  <TableHead>Armadollars</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map(task => (
                  <TableRow key={task.id}>
                    <TableCell>{task.name}</TableCell>
                    <TableCell>{task.armadollars}</TableCell>
                    <TableCell>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button className="bg-[#8B0000] text-white hover:bg-[#A52A2A] transition-colors duration-300">
                            Edit
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-[#F5DEB3] text-[#8B0000]">
                          <DialogHeader>
                            <DialogTitle>Edit Task: {task.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-2">
                            <Label htmlFor="taskName">Task Name</Label>
                            <Input
                              id="taskName"
                              defaultValue={task.name}
                              className="bg-white/50 border-[#8B0000]"
                            />
                            <Label htmlFor="taskValue">Armadollars Value</Label>
                            <Input
                              id="taskValue"
                              type="number"
                              defaultValue={task.armadollars}
                              className="bg-white/50 border-[#8B0000]"
                            />
                            <Button className="w-full bg-[#8B0000] text-white hover:bg-[#A52A2A] transition-colors duration-300">
                              Save Changes
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
          <TabsContent value="employees">
            <h3 className="text-2xl font-semibold mb-4 text-center">Employee Overview</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Armadollars</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {employees.map(employee => (
                  <TableRow key={employee.id}>
                    <TableCell>{employee.name}</TableCell>
                    <TableCell>{employee.role}</TableCell>
                    <TableCell>{employee.armadollars}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}