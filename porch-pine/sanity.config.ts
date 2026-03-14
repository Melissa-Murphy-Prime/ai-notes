import { defineConfig } from '@sanity/cli'

export default defineConfig({
  name: 'default',
  title: 'Porch & Pine Properties',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  plugins: [],
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  basePath: '/studio',
})
