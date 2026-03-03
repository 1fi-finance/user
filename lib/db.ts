import postgres from 'postgres'

// Database connection using the PostgreSQL DATABASE_URL
// Connection string format: postgres://username:password@host:port/database
const DATABASE_URL = process.env.DATABASE_URL

if (!DATABASE_URL) {
  console.warn('[DB] DATABASE_URL not configured - using fallback mode')
}

// Create a singleton postgres instance
const sql = DATABASE_URL 
  ? postgres(DATABASE_URL, {
      max: 1, // Connection pool size
    })
  : null

export { sql }

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type DbRow = Record<string, any>

// Helper function to execute queries
export async function query(queryString: string, params: unknown[] = []): Promise<DbRow[]> {
  if (!sql) {
    console.warn('[DB] No database connection - query skipped')
    return []
  }
  
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const result = await sql.unsafe(queryString, params as any)
    return result as any as DbRow[]
  } catch (error) {
    console.error('[DB] Query error:', error)
    throw error
  }
}

// Helper function for single row queries
export async function queryOne(queryString: string, params: unknown[] = []): Promise<DbRow | null> {
  const results = await query(queryString, params)
  return results[0] || null
}
