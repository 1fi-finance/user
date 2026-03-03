import { NextRequest, NextResponse } from 'next/server'
import { sendOTP, isWasenderConfigured } from '@/lib/otp-service'

export async function POST(request: NextRequest) {
  try {
    // Check if API is configured
    if (!isWasenderConfigured()) {
      return NextResponse.json(
        { success: false, message: 'OTP service is not configured. Please contact support.', errorType: 'SERVICE_NOT_CONFIGURED' },
        { status: 503 }
      )
    }

    const body = await request.json()
    const { phoneNumber } = body

    // Validate required fields
    if (!phoneNumber) {
      return NextResponse.json(
        { success: false, message: 'Phone number is required', errorType: 'MISSING_PHONE' },
        { status: 400 }
      )
    }

    // Validate phone number format - remove non-digits
    const cleanPhone = phoneNumber.replace(/\D/g, '')
    
    if (cleanPhone.length < 10 || cleanPhone.length > 15) {
      return NextResponse.json(
        { success: false, message: 'Invalid phone number format. Must be 10-15 digits.', errorType: 'INVALID_PHONE' },
        { status: 400 }
      )
    }

    // Format phone number with country code if not present
    let fullPhone = cleanPhone
    if (!cleanPhone.startsWith('91') && cleanPhone.length === 10) {
      fullPhone = '91' + cleanPhone
    }

    // Check if already has country code but wrong length
    if (cleanPhone.startsWith('91') && cleanPhone.length !== 12) {
      return NextResponse.json(
        { success: false, message: 'Invalid phone number. Indian numbers must have 10 digits after country code.', errorType: 'INVALID_PHONE' },
        { status: 400 }
      )
    }

    // Send OTP
    const result = await sendOTP(fullPhone)

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: result.message,
        expiration: result.expiration
      })
    } else {
      // Return specific error type
      let errorType = 'SEND_FAILED'
      let statusCode = 500

      if (result.message?.includes('Invalid phone number')) {
        errorType = 'INVALID_PHONE'
        statusCode = 400
      } else if (result.message?.includes('Network')) {
        errorType = 'NETWORK_ERROR'
      } else if (result.errorCode) {
        errorType = result.errorCode
      }

      return NextResponse.json(
        { 
          success: false, 
          message: result.message,
          errorType
        },
        { status: statusCode }
      )
    }
  } catch (error) {
    console.error('[Send OTP API] Error:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error', errorType: 'SERVER_ERROR' },
      { status: 500 }
    )
  }
}

// Add GET method to check API status
export async function GET() {
  return NextResponse.json({
    success: true,
    message: 'OTP Send API is running',
    configured: isWasenderConfigured()
  })
}
