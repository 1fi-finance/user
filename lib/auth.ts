import { betterAuth } from "better-auth"
import { phoneNumber } from "better-auth/plugins"

// Database configuration for PostgreSQL
const database = {
  provider: "postgres",
  url: process.env.DATABASE_URL,
}

export const auth = betterAuth({
  database,
  plugins: [
    phoneNumber(),
  ],
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
})
