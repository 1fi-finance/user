import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { query, queryOne } from '@/lib/db'

// PAN card format validation: 5 letters, 4 numbers, 1 letter (AAAAA1234A)
const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]$/

// Email validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

interface KYCFormData {
  email: string
  panNumber: string
  fullName: string
  dateOfBirth: string
}

interface Customer {
  id: string
  email: string
  pan_number: string
  full_name: string
  date_of_birth: string
  user_id: string
  created_at: Date
  updated_at: Date
}

function validateKYCData(data: KYCFormData): { valid: boolean; errors: string[] } {
  const errors: string[] = []

  // Email validation
  if (!data.email) {
    errors.push('Email is required')
  } else if (!EMAIL_REGEX.test(data.email)) {
    errors.push('Invalid email format')
  }

  // PAN validation
  if (!data.panNumber) {
    errors.push('PAN number is required')
  } else if (!PAN_REGEX.test(data.panNumber.toUpperCase())) {
    errors.push('Invalid PAN format. Must be 5 letters, 4 numbers, 1 letter (e.g., AAAAA1234A)')
  }

  // Name validation
  if (!data.fullName) {
    errors.push('Full name is required')
  } else if (data.fullName.trim().length < 2) {
    errors.push('Full name must be at least 2 characters')
  }

  // DOB validation
  if (!data.dateOfBirth) {
    errors.push('Date of birth is required')
  } else {
    const dob = new Date(data.dateOfBirth)
    if (isNaN(dob.getTime())) {
      errors.push('Invalid date format')
    } else {
      // Check if user is 18+
      const today = new Date()
      const age = today.getFullYear() - dob.getFullYear()
      const monthDiff = today.getMonth() - dob.getMonth()
      const dayDiff = today.getDate() - dob.getDate()
      let calculatedAge = age
      if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        calculatedAge--
      }
      
      if (calculatedAge < 18) {
        errors.push('You must be at least 18 years old')
      }
    }
  }

  return { valid: errors.length === 0, errors }
}

export async function POST(request: NextRequest) {
  try {
    // Get the session
    const session = await auth.api.getSession({
      headers: request.headers,
    })

    if (!session?.user) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized. Please login first.', errorType: 'UNAUTHORIZED' },
        { status: 401 }
      )
    }

    const body = await request.json()
    const { email, panNumber, fullName, dateOfBirth } = body

    // Validate form data
    const validation = validateKYCData({
      email,
      panNumber,
      fullName,
      dateOfBirth,
    })

    if (!validation.valid) {
      return NextResponse.json(
        { success: false, message: validation.errors.join(', '), errorType: 'VALIDATION_ERROR', errors: validation.errors },
        { status: 400 }
      )
    }

    const userId = session.user.id
    const upperPan = panNumber.toUpperCase()
    const now = new Date()

    console.log('[KYC Submit] Saving KYC data for user:', userId)
    console.log('[KYC Submit] Email:', email)
    console.log('[KYC Submit] PAN:', upperPan)
    console.log('[KYC Submit] Name:', fullName)
    console.log('[KYC Submit] DOB:', dateOfBirth)

    // Check if customer already exists for this user
    const existingCustomer = await queryOne(
      'SELECT * FROM customers WHERE user_id = $1',
      [userId]
    )

    if (existingCustomer) {
      // Update existing customer record
      await query(
        `UPDATE customers 
         SET email = $1, pan_number = $2, full_name = $3, date_of_birth = $4, updated_at = $5
         WHERE user_id = $6`,
        [email, upperPan, fullName, dateOfBirth, now, userId]
      )
      console.log('[KYC Submit] Updated existing customer record')
    } else {
      // Insert new customer record
      const newId = crypto.randomUUID()
      await query(
        `INSERT INTO customers (id, email, pan_number, full_name, date_of_birth, user_id, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [newId, email, upperPan, fullName, dateOfBirth, userId, now, now]
      )
      console.log('[KYC Submit] Created new customer record:', newId)
    }

    // Return success response
    return NextResponse.json({
      success: true,
      message: 'KYC submitted successfully',
      data: {
        email: email,
        panNumber: upperPan,
        fullName: fullName,
        dateOfBirth: dateOfBirth,
      }
    })

  } catch (error) {
    console.error('[KYC Submit API] Error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error', errorType: 'SERVER_ERROR' },
      { status: 500 }
    )
  }
}

// GET method to check API status
export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'KYC Submit API is running',
  })
}
