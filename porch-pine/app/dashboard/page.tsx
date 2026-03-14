'use client'

import { useSession, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Dashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [activeTab, setActiveTab] = useState('leases')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  if (!session) {
    return null
  }

  // Mock data - replace with real Rentec API data
  const leaseData = {
    property: 'Riverside Luxury Cabin',
    lease_start: '2024-01-15',
    lease_end: '2024-12-31',
    monthly_rent: '$2,500',
    status: 'Active',
  }

  const payments = [
    { date: '2024-03-01', amount: '$2,500', status: 'Paid' },
    { date: '2024-02-01', amount: '$2,500', status: 'Paid' },
    { date: '2024-01-01', amount: '$2,500', status: 'Paid' },
  ]

  const maintenance = [
    { id: 1, title: 'Roof Inspection', status: 'Completed', date: '2024-03-10' },
    { id: 2, title: 'HVAC Maintenance', status: 'In Progress', date: '2024-03-15' },
    { id: 3, title: 'Gutter Cleaning', status: 'Pending', date: '2024-03-20' },
  ]

  return (
    <>
      <section className="py-12 bg-gradient-to-br from-neutral-100 to-neutral-50">
        <div className="container">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-4xl font-serif font-bold mb-2">Dashboard</h1>
              <p className="text-neutral-600">Welcome back, {session.user?.name || session.user?.email}</p>
            </div>
            <button
              onClick={() => signOut()}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-white border-b border-neutral-200 sticky top-16 z-40">
        <div className="container">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('leases')}
              className={`py-4 px-2 font-bold border-b-2 transition ${
                activeTab === 'leases'
                  ? 'border-accent-green text-accent-green'
                  : 'border-transparent text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Lease Details
            </button>
            <button
              onClick={() => setActiveTab('payments')}
              className={`py-4 px-2 font-bold border-b-2 transition ${
                activeTab === 'payments'
                  ? 'border-accent-green text-accent-green'
                  : 'border-transparent text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Rent Payments
            </button>
            <button
              onClick={() => setActiveTab('maintenance')}
              className={`py-4 px-2 font-bold border-b-2 transition ${
                activeTab === 'maintenance'
                  ? 'border-accent-green text-accent-green'
                  : 'border-transparent text-neutral-600 hover:text-neutral-900'
              }`}
            >
              Maintenance
            </button>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container max-w-3xl">
          {/* Lease Details Tab */}
          {activeTab === 'leases' && (
            <div className="bg-white rounded shadow-lg p-8">
              <h2 className="text-2xl font-serif font-bold mb-6">Lease Details</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-neutral-600">Property</p>
                    <p className="font-bold">{leaseData.property}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Monthly Rent</p>
                    <p className="font-bold text-accent-green">{leaseData.monthly_rent}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-neutral-600">Lease Start</p>
                    <p className="font-bold">{leaseData.lease_start}</p>
                  </div>
                  <div>
                    <p className="text-sm text-neutral-600">Lease End</p>
                    <p className="font-bold">{leaseData.lease_end}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-neutral-600">Status</p>
                  <p className="font-bold text-green-600">{leaseData.status}</p>
                </div>
              </div>
              <p className="text-sm text-neutral-600 mt-6 pt-6 border-t">
                Questions about your lease? Contact us at <a href="mailto:broker@propertybyprime.com" className="text-accent-green hover:underline">broker@propertybyprime.com</a>
              </p>
            </div>
          )}

          {/* Payments Tab */}
          {activeTab === 'payments' && (
            <div className="bg-white rounded shadow-lg p-8">
              <h2 className="text-2xl font-serif font-bold mb-6">Rent Payment History</h2>
              <div className="space-y-4">
                {payments.map((payment, index) => (
                  <div key={index} className="flex justify-between items-center py-4 border-b last:border-b-0">
                    <div>
                      <p className="font-bold">{payment.date}</p>
                      <p className="text-neutral-600">{payment.amount}</p>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm font-bold">
                      {payment.status}
                    </span>
                  </div>
                ))}
              </div>
              <button className="mt-6 bg-accent-green text-white px-6 py-2 rounded hover:bg-opacity-90">
                Make a Payment
              </button>
            </div>
          )}

          {/* Maintenance Tab */}
          {activeTab === 'maintenance' && (
            <div className="bg-white rounded shadow-lg p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif font-bold">Maintenance Requests</h2>
                <button className="bg-accent-green text-white px-4 py-2 rounded hover:bg-opacity-90">
                  + New Request
                </button>
              </div>
              <div className="space-y-4">
                {maintenance.map((request) => (
                  <div key={request.id} className="flex justify-between items-start py-4 border-b last:border-b-0">
                    <div>
                      <p className="font-bold">{request.title}</p>
                      <p className="text-sm text-neutral-600">{request.date}</p>
                    </div>
                    <span className={`px-3 py-1 rounded text-sm font-bold ${
                      request.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      request.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {request.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Help Section */}
      <section className="py-12 bg-neutral-100">
        <div className="container max-w-3xl text-center">
          <h2 className="text-2xl font-serif font-bold mb-4">Need Help?</h2>
          <p className="text-neutral-600 mb-6">
            For questions or support, please reach out to our team
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="mailto:broker@propertybyprime.com" className="bg-accent-green text-white px-6 py-2 rounded hover:bg-opacity-90">
              Contact Broker
            </a>
            <a href="mailto:melissa@propertybyprime.com" className="border-2 border-accent-green text-accent-green px-6 py-2 rounded hover:bg-accent-green hover:text-white transition">
              Contact Manager
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
