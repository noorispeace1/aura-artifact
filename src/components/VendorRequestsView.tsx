"use client"

import { useState, useEffect } from "react"
import { CheckCircle, XCircle, Trash2 } from "lucide-react"

type Application = {
  _id: string
  userId: string
  userName: string
  companyName: string
  status: string
  createdAt: string
  contactPersonEmail: string
  organizationType: string
}

export function VendorRequestsView() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchApplications()
  }, [])

  const fetchApplications = async () => {
    try {
      const res = await fetch((process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000") + "/api/vendor-applications")
      if (res.ok) {
        const data = await res.json()
        setApplications(data)
      }
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (id: string, status: "approved" | "rejected") => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/vendor-applications/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      })
      if (res.ok) {
        setApplications(apps => apps.map(app => app._id === id ? { ...app, status } : app))
        alert(`Application ${status} successfully.`)
      }
    } catch (error) {
      console.error(error)
      alert("Failed to update status")
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this application permanently?")) return

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"}/api/vendor-applications/${id}`, {
        method: "DELETE"
      })
      if (res.ok) {
        setApplications(apps => apps.filter(app => app._id !== id))
        alert("Application deleted successfully.")
      }
    } catch (error) {
      console.error(error)
      alert("Failed to delete application")
    }
  }

  if (loading) return <div className="p-8 text-zinc-500">Loading applications...</div>

  return (
    <div className="p-8 max-w-[1600px] mx-auto w-full">
      <div className="bg-white rounded-2xl border border-zinc-200 shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-zinc-100 flex justify-between items-center bg-zinc-50/50">
          <h2 className="text-xl font-bold text-zinc-900">Vendor Requests</h2>
          <div className="text-sm text-zinc-500 font-medium">Total: {applications.length}</div>
        </div>
        
        {applications.length === 0 ? (
          <div className="p-12 text-center text-zinc-500 font-medium">No vendor applications found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
              <thead className="bg-white text-zinc-500 border-b border-zinc-100">
                <tr>
                  <th className="px-6 py-4 font-medium">Company Name</th>
                  <th className="px-6 py-4 font-medium">Applicant</th>
                  <th className="px-6 py-4 font-medium">Contact Email</th>
                  <th className="px-6 py-4 font-medium">Type</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {applications.map((app) => (
                  <tr key={app._id} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-zinc-900">{app.companyName}</td>
                    <td className="px-6 py-4 text-zinc-600">{app.userName}</td>
                    <td className="px-6 py-4 text-zinc-600">{app.contactPersonEmail}</td>
                    <td className="px-6 py-4 text-zinc-600">{app.organizationType}</td>
                    <td className="px-6 py-4 text-zinc-500">{new Date(app.createdAt).toLocaleDateString()}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${
                        app.status === 'approved' ? 'bg-green-100 text-green-700' :
                        app.status === 'rejected' ? 'bg-red-100 text-red-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {app.status === "pending" && (
                          <>
                            <button 
                              onClick={() => handleUpdateStatus(app._id, "approved")}
                              className="p-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                              title="Approve"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleUpdateStatus(app._id, "rejected")}
                              className="p-2 bg-amber-50 text-amber-600 hover:bg-amber-100 rounded-lg transition-colors"
                              title="Reject"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
                        <button 
                          onClick={() => handleDelete(app._id)}
                          className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors ml-2"
                          title="Delete Application"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
