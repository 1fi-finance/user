import { NextRequest, NextResponse } from 'next/server'
import { verifyOTP, isWasenderConfigured } from '@/lib/otp-service'

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
    const { phoneNumber, code } = body

    // Validate required fields
    if (!phoneNumber) {
      return NextResponse.json(
        { success: false, message: 'Phone number is required', errorType: 'MISSING_PHONE' },
        { status: 400 }
      )
    }

    if (!code) {
      return NextResponse.json(
        { success: false, message: 'OTP code is required', errorType: 'MISSING_CODE' },
        { status: 400 }
      )
    }

    // Validate phone number format
    const cleanPhone = phoneNumber.replace(/\D/g, '')
    
    if (cleanPhone.length < 10 || cleanPhone.length > 15) {
      return NextResponse.json(
        { success: false, message: 'Invalid phone number format', errorType: 'INVALID_PHONE' },
        { status: 400 }
      )
    }

    // Validate OTP code format
    if (code.length !== 6 || !/^\d+$/.test(code)) {
      return NextResponse.json(
        { success: false, message: 'Invalid OTP format. Please enter 6 digits.', errorType: 'INVALID_CODE_FORMAT' },
        { status: 400 }
      )
    }

    // Format phone number with country code if not present
    let fullPhone = cleanPhone
    if (!cleanPhone.startsWith('91') && cleanPhone.length === 10) {
      fullPhone = '91' + cleanPhone
    }

    // Verify OTP
    const result = await verifyOTP(fullPhone, code)

    if (result.success && result.valid) {
      return NextResponse.json({
        success: true,
        message: result.message
      })
    } else {
      // Return specific error type for different failure cases
      let errorType = 'VERIFICATION_FAILED'
      let statusCode = 400

      if (result.message?.includes('expired')) {
        errorType = 'OTP_EXPIRED'
      } else if (result.message?.includes('Invalid OTP')) {
        errorType = 'INVALID_OTP'
      } else if (result.message?.includes('No OTP found')) {
        errorType = 'NO_OTP_FOUND'
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
    console.error('[Verify OTP API] Error:', error)
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
    message: 'OTP Verify API is running',
    configured: isWasenderConfigured()
  })
}
