import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, token } from '../env'

// Read-only client for public data (uses CDN)
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

// Write client for server-side mutations (does not use CDN)
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token, // Required for write operations
})
