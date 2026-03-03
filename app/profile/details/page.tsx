'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import StatusBar from '@/components/profile/StatusBar'
import PageHeader from '@/components/profile/PageHeader'

export default function ProfileDetailsPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    fullName: 'Mehul Sethia',
    email: 'chirantanadhikary@gmail.com',
    mobileNumber: '7384389348384',
    dateOfBirth: '04-07-1997',
    gender: 'Male',
    maritalStatus: 'Single'
  })

  const [showGenderDropdown, setShowGenderDropdown] = useState(false)
  const [showMaritalDropdown, setShowMaritalDropdown] = useState(false)

  const genderOptions = ['Male', 'Female', 'Other']
  const maritalOptions = ['Single', 'Married', 'Divorced', 'Widowed']

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 font-sans">
      <main
        className="flex w-full max-w-md flex-col bg-white overflow-hidden relative"
        style={{ height: '852px', width: '393px', borderRadius: '2px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
      >
        {/* Status Bar */}
        <StatusBar />

        {/* Header */}
        <PageHeader title="Profile Details" onBack={() => router.back()} />

        {/* Form Content */}
        <div className="flex-1 overflow-y-auto px-5 py-4" style={{ backgroundColor: '#f9fafb' }}>
          {/* Basic Details Section */}
          <div className="mb-6">
            <h2 className="text-sm font-medium text-gray-600 mb-4">Basic details</h2>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* Full Name */}
              <div className="px-4 py-3 border-b border-gray-100">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => handleChange('fullName', e.target.value)}
                  className="w-full text-sm text-gray-900 outline-none"
                />
              </div>

              {/* Email Id */}
              <div className="px-4 py-3 border-b border-gray-100">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Email Id
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full text-sm text-gray-900 outline-none"
                />
              </div>

              {/* Mobile Number */}
              <div className="px-4 py-3 border-b border-gray-100">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Mobile Number
                </label>
                <input
                  type="tel"
                  value={formData.mobileNumber}
                  onChange={(e) => handleChange('mobileNumber', e.target.value)}
                  className="w-full text-sm text-gray-900 outline-none"
                />
              </div>

              {/* Date of Birth */}
              <div className="px-4 py-3 border-b border-gray-100">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Date of birth
                </label>
                <input
                  type="text"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                  placeholder="DD-MM-YYYY"
                  className="w-full text-sm text-gray-900 outline-none"
                />
              </div>

              {/* Gender Dropdown */}
              <div className="px-4 py-3 border-b border-gray-100 relative">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Gender
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setShowGenderDropdown(!showGenderDropdown)
                    setShowMaritalDropdown(false)
                  }}
                  className="w-full flex items-center justify-between text-sm text-gray-900 outline-none"
                >
                  <span>{formData.gender}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${showGenderDropdown ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showGenderDropdown && (
                  <div className="absolute left-4 right-4 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    {genderOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          handleChange('gender', option)
                          setShowGenderDropdown(false)
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-900 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Marital Status Dropdown */}
              <div className="px-4 py-3 relative">
                <label className="block text-xs font-medium text-gray-600 mb-1">
                  Marital status
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setShowMaritalDropdown(!showMaritalDropdown)
                    setShowGenderDropdown(false)
                  }}
                  className="w-full flex items-center justify-between text-sm text-gray-900 outline-none"
                >
                  <span>{formData.maritalStatus}</span>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${showMaritalDropdown ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showMaritalDropdown && (
                  <div className="absolute left-4 right-4 top-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                    {maritalOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          handleChange('maritalStatus', option)
                          setShowMaritalDropdown(false)
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-900 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="px-5 py-4 bg-white border-t border-gray-100">
          <button
            onClick={() => console.log('Save changes:', formData)}
            className="w-full h-14 rounded-full text-white font-medium tracking-wide transition-colors"
            style={{ backgroundColor: '#712CDC' }}
          >
            Save Changes
          </button>
        </div>

      </main>
    </div>
  )
}
