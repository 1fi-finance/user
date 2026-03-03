// OTP Service using WasenderAPI
// Documentation: https://wasenderapi.com/api-docs

const WASENDER_API_URL = 'https://wasenderapi.com/api'

interface SendOTPResponse {
  success: boolean
  message?: string
  otp?: string
  expiration?: number
  errorCode?: string
}

interface VerifyOTPResponse {
  success: boolean
  message?: string
  valid?: boolean
}

// In-memory store for OTPs (for demo - use Redis/database in production)
const otpStore = new Map<string, { otp: string; expiresAt: number }>()

export async function sendOTP(phoneNumber: string): Promise<SendOTPResponse> {
  try {
    // Clean phone number - remove any non-digit characters
    const cleanPhone = phoneNumber.replace(/\D/g, '')
    
    // Validate phone number format - must be Indian number with country code
    if (!cleanPhone.startsWith('91') || cleanPhone.length !== 12) {
      return {
        success: false,
        message: 'Invalid phone number format. Must be 10 digits with country code 91.',
        errorCode: 'INVALID_PHONE_FORMAT'
      }
    }
    
    // Check if WasenderAPI key is configured
    const apiKey = process.env.WASENDER_API_KEY
    
    if (!apiKey) {
      console.error('[OTP Service] WASENDER_API_KEY is not configured')
      return {
        success: false,
        message: 'OTP service is not configured. Please contact support.',
        errorCode: 'SERVICE_NOT_CONFIGURED'
      }
    }
    
    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    
    // Store OTP with 5-minute expiration
    const expiresAt = Date.now() + 5 * 60 * 1000
    otpStore.set(cleanPhone, { otp, expiresAt })
    
    // Format phone number with +91 prefix for API
    const formattedPhone = '+' + cleanPhone
    
    // Create OTP message
    const otpMessage = `Your verification code is: ${otp}. Valid for 5 minutes.`
    
    // Call WasenderAPI to send OTP using send-message endpoint
    const response = await fetch(`${WASENDER_API_URL}/send-message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        to: formattedPhone,
        text: otpMessage
      })
    })
    
    // Check if response is JSON
    const contentType = response.headers.get('content-type')
    if (!contentType || !contentType.includes('application/json')) {
      // Response is not JSON - likely an error page
      console.error('[WasenderAPI] Non-JSON response received:', {
        status: response.status,
        statusText: response.statusText,
        contentType: contentType
      })
      
      // Handle specific HTTP errors
      if (response.status === 401) {
        return {
          success: false,
          message: 'Invalid API key. Please contact support.',
          errorCode: 'INVALID_API_KEY'
        }
      }
      if (response.status === 403) {
        return {
          success: false,
          message: 'Access forbidden. Please contact support.',
          errorCode: 'ACCESS_FORBIDDEN'
        }
      }
      if (response.status === 404) {
        return {
          success: false,
          message: 'OTP service endpoint not found. Please contact support.',
          errorCode: 'ENDPOINT_NOT_FOUND'
        }
      }
      if (response.status >= 500) {
        return {
          success: false,
          message: 'OTP service temporarily unavailable. Please try again later.',
          errorCode: 'SERVICE_UNAVAILABLE'
        }
      }
      
      return {
        success: false,
        message: 'Failed to send OTP. Please try again.',
        errorCode: 'UNKNOWN_ERROR'
      }
    }
    
    const data = await response.json()
    
    // Check if WasenderAPI returned an error
    if (!response.ok || data.success === false) {
      console.error('[WasenderAPI] Error sending OTP:', data)
      
      const errorMessage = data.message || 'Failed to send OTP'
      const errorCode = data.errorCode || 'API_ERROR'
      
      return {
        success: false,
        message: errorMessage,
        errorCode
      }
    }
    
    // Check if message was actually sent
    if (data.status === 'failed' || data.error) {
      console.error('[WasenderAPI] OTP sending failed:', data)
      return {
        success: false,
        message: data.message || 'Failed to send OTP. Please try again.',
        errorCode: data.errorCode || 'SEND_FAILED'
      }
    }
    
    console.log(`[WasenderAPI] OTP sent successfully to ${cleanPhone}`)
    
    return {
      success: true,
      message: 'OTP sent successfully',
      expiration: expiresAt
    }
    
  } catch (error) {
    console.error('[OTP Service] Error sending OTP:', error)
    
    // Handle network errors or JSON parsing errors
    if (error instanceof SyntaxError) {
      return {
        success: false,
        message: 'Failed to send OTP. Invalid response from server.',
        errorCode: 'INVALID_RESPONSE'
      }
    }
    
    return {
      success: false,
      message: 'Failed to send OTP. Network error. Please try again.',
      errorCode: 'NETWORK_ERROR'
    }
  }
}

export async function verifyOTP(phoneNumber: string, code: string): Promise<VerifyOTPResponse> {
  try {
    // Clean phone number
    const cleanPhone = phoneNumber.replace(/\D/g, '')
    
    // Validate input
    if (!code || code.length !== 6) {
      return {
        success: false,
        message: 'Invalid OTP format. Please enter 6 digits.',
        valid: false
      }
    }
    
    // Get stored OTP
    const stored = otpStore.get(cleanPhone)
    
    if (!stored) {
      return {
        success: false,
        message: 'No OTP found. Please request a new OTP.',
        valid: false
      }
    }
    
    // Check expiration
    if (Date.now() > stored.expiresAt) {
      otpStore.delete(cleanPhone)
      return {
        success: false,
        message: 'OTP has expired. Please request a new one.',
        valid: false
      }
    }
    
    // Verify code
    if (stored.otp === code) {
      otpStore.delete(cleanPhone)
      return {
        success: true,
        message: 'OTP verified successfully',
        valid: true
      }
    } else {
      return {
        success: false,
        message: 'Invalid OTP. Please check and try again.',
        valid: false
      }
    }
  } catch (error) {
    console.error('[OTP Service] Error verifying OTP:', error)
    return {
      success: false,
      message: 'Failed to verify OTP. Please try again.',
      valid: false
    }
  }
}

// Helper to resend OTP (clears old OTP and sends new one)
export async function resendOTP(phoneNumber: string): Promise<SendOTPResponse> {
  // Clear any existing OTP
  const cleanPhone = phoneNumber.replace(/\D/g, '')
  otpStore.delete(cleanPhone)
  
  // Small delay to prevent abuse
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Send new OTP
  return sendOTP(cleanPhone)
}

// Check if WasenderAPI is configured
export function isWasenderConfigured(): boolean {
  return !!process.env.WASENDER_API_KEY
}
