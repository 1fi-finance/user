// External LOS (Loan Management System) API Client

const EXTERNAL_API_URL = process.env.EXTERNAL_API_URL!;
const EXTERNAL_API_KEY = process.env.EXTERNAL_API_KEY!;

interface CreateCustomerResponse {
  success: boolean;
  data: {
    userId: string;
    frappeCustomerName: string;
  };
}

interface Customer {
  id: string;
  fullName: string;
  age: number;
  pan: string;
  mobile: string;
  email: string;
  status: string;
  emailVerified: boolean;
  mobileVerified: boolean;
  panVerified: boolean;
  kycVerified: boolean;
  frappeCustomerName: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface GetCustomerResponse {
  success: boolean;
  data: Customer;
}

export async function createCustomer(data: {
  fullName: string;
  pan: string;
  mobile: string;
  email: string;
  age?: number;
}): Promise<CreateCustomerResponse> {
  const cleanMobile = data.mobile.replace(/\D/g, "");
  const mobileWithoutCountry = cleanMobile.startsWith("91")
    ? cleanMobile.slice(2)
    : cleanMobile;

  const response = await fetch(`${EXTERNAL_API_URL}/customer/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": EXTERNAL_API_KEY,
    },
    body: JSON.stringify({
      fullName: data.fullName,
      pan: data.pan.toUpperCase(),
      mobile: mobileWithoutCountry,
      email: data.email.toLowerCase(),
      age: data.age || 25,
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create customer: ${await response.text()}`);
  }

  return response.json();
}

export async function getCustomerByMobile(
  mobile: string,
): Promise<Customer | null> {
  const cleanMobile = mobile.replace(/\D/g, "");
  const mobileWithoutCountry = cleanMobile.startsWith("91")
    ? cleanMobile.slice(2)
    : cleanMobile;

  try {
    const response = await fetch(`${EXTERNAL_API_URL}/customer/`, {
      method: "GET",
      headers: {
        "x-api-key": EXTERNAL_API_KEY,
      },
    });

    if (!response.ok) {
      return null;
    }

    const data: GetCustomerResponse = await response.json();

    if (!data.success || !data.data) {
      return null;
    }

    if (data.data.mobile === mobileWithoutCountry) {
      return data.data;
    }

    return null;
  } catch (error) {
    console.error("[LOS API] Error fetching customer:", error);
    return null;
  }
}

export async function updateCustomer(data: {
  fullName: string;
  pan: string;
  mobile: string;
  email: string;
  age?: number;
  status?: string;
}): Promise<GetCustomerResponse> {
  const cleanMobile = data.mobile.replace(/\D/g, "");
  const mobileWithoutCountry = cleanMobile.startsWith("91")
    ? cleanMobile.slice(2)
    : cleanMobile;

  const response = await fetch(`${EXTERNAL_API_URL}/customer/`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": EXTERNAL_API_KEY,
    },
    body: JSON.stringify({
      fullName: data.fullName,
      pan: data.pan.toUpperCase(),
      mobile: mobileWithoutCountry,
      email: data.email.toLowerCase(),
      age: data.age || 25,
      status: data.status || "active",
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update customer: ${await response.text()}`);
  }

  return response.json();
}
