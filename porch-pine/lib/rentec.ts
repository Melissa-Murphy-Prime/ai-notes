import axios from 'axios'

const rentecClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_RENTEC_API_URL,
  headers: {
    'Authorization': `Bearer ${process.env.RENTEC_API_KEY}`,
    'Content-Type': 'application/json',
  },
})

// Get lease details for a user
export async function getLeaseDetails(userId: string) {
  try {
    // Placeholder implementation - update with real Rentec API endpoints
    const response = await rentecClient.get(`/leases/${userId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching lease details:', error)
    throw error
  }
}

// Get rent payment history
export async function getRentPayments(userId: string) {
  try {
    // Placeholder implementation
    const response = await rentecClient.get(`/payments/${userId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching rent payments:', error)
    throw error
  }
}

// Get maintenance requests
export async function getMaintenanceRequests(userId: string) {
  try {
    // Placeholder implementation
    const response = await rentecClient.get(`/maintenance/${userId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching maintenance requests:', error)
    throw error
  }
}

// Submit maintenance request
export async function submitMaintenanceRequest(userId: string, data: any) {
  try {
    const response = await rentecClient.post(`/maintenance/${userId}`, data)
    return response.data
  } catch (error) {
    console.error('Error submitting maintenance request:', error)
    throw error
  }
}

export default rentecClient
