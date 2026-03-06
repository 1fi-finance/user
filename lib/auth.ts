import { betterAuth } from "better-auth";
import { phoneNumber } from "better-auth/plugins";
import { Pool } from "pg";
import { sendOTP } from "./otp-service";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
  max: 5,
  min: 1,
  idleTimeoutMillis: 10000,
  connectionTimeoutMillis: 5000,
});

pool.on("error", (err) => {
  console.error("[Database Pool] Unexpected error on idle client", err);
});

pool.on("connect", () => {
  console.log("[Database Pool] New client connected");
});

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || "http://localhost:3000",

  trustedOrigins: [
    "http://localhost:3000",
    "http://localhost:4002",
    "http://user.localhost:1355",
    "http://localhost:1355",
  ],

  database: pool,

  user: {
    modelName: "customers",
    fields: {
      id: "id",
      name: "fullName",
      email: "email",
      emailVerified: "emailVerified",
      createdAt: "createdAt",
      updatedAt: "updatedAt",
      phoneNumber: "mobile",
      phoneNumberVerified: "mobileVerified",
    },
    additionalFields: {
      age: {
        type: "number",
        required: false,
        input: false,
      },
      blakepan: {
        type: "string",
        required: false,
        input: false,
      },
      aespan: {
        type: "string",
        required: false,
        input: false,
      },
      pekrn: {
        type: "string",
        required: false,
        input: false,
      },
      status: {
        type: "string",
        required: false,
        defaultValue: "pending",
        input: false,
      },
      panverified: {
        type: "boolean",
        required: false,
        defaultValue: false,
        input: false,
      },
      pekrnverified: {
        type: "boolean",
        required: false,
        defaultValue: false,
        input: false,
      },
      kycverified: {
        type: "boolean",
        required: false,
        defaultValue: false,
        input: false,
      },
      frappecustomername: {
        type: "string",
        required: false,
        input: false,
      },
      isactive: {
        type: "boolean",
        required: false,
        defaultValue: true,
        input: false,
      },
    },
  },

  session: {
    modelName: "session",
    fields: {
      userId: "user_id",
      createdAt: "created_at",
      updatedAt: "updated_at",
      expiresAt: "expires_at",
      ipAddress: "ip_address",
      userAgent: "user_agent",
    },
  },

  account: {
    modelName: "account",
    fields: {
      userId: "user_id",
      accountId: "account_id",
      providerId: "provider_id",
      accessToken: "access_token",
      refreshToken: "refresh_token",
      accessTokenExpiresAt: "access_token_expires_at",
      refreshTokenExpiresAt: "refresh_token_expires_at",
      idToken: "id_token",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },

  verification: {
    modelName: "verification",
    fields: {
      expiresAt: "expires_at",
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  },

  plugins: [
    phoneNumber({
      sendOTP: async ({ phoneNumber, code }, ctx) => {
        console.log(
          "[Better Auth] Sending OTP to:",
          phoneNumber,
          "Code:",
          code,
        );
        const cleanPhone = phoneNumber.replace(/\D/g, "");
        const phoneWithoutCountry = cleanPhone.startsWith("91")
          ? cleanPhone.slice(2)
          : cleanPhone;

        try {
          const result = await sendOTP(phoneWithoutCountry, code);
          console.log("[Better Auth] OTP send result:", result);
          if (!result.success) {
            throw new Error(result.message || "Failed to send OTP");
          }
        } catch (error) {
          console.error("[Better Auth] OTP send error:", error);
          throw error;
        }
      },

      signUpOnVerification: {
        getTempEmail: (phoneNumber) => {
          const cleanPhone = phoneNumber.replace(/\D/g, "");
          const phoneWithoutCountry = cleanPhone.startsWith("91")
            ? cleanPhone.slice(2)
            : cleanPhone;
          return `${phoneWithoutCountry}@temp.1fi.com`;
        },
        getTempName: (phoneNumber) => {
          const cleanPhone = phoneNumber.replace(/\D/g, "");
          const phoneWithoutCountry = cleanPhone.startsWith("91")
            ? cleanPhone.slice(2)
            : cleanPhone;
          return phoneWithoutCountry;
        },
      },

      otpLength: 6,
      expiresIn: 300,

      phoneNumberValidator: (phoneNumber) => {
        const cleanPhone = phoneNumber.replace(/\D/g, "");
        return cleanPhone.length === 10 || cleanPhone.length === 12;
      },
    }),
  ],

  emailAndPassword: {
    enabled: false,
  },

  databaseHooks: {
    user: {
      create: {
        after: async (user, ctx) => {
          if (
            user.pan &&
            user.email &&
            user.name &&
            !user.email.includes("@temp.1fi.com")
          ) {
            try {
              const { createCustomer } = await import("./los-api");

              const externalCustomer = await createCustomer({
                fullName: user.name,
                pan: user.pan as string,
                mobile: (user.phoneNumber as string) || "",
                email: user.email,
                age: user.age as number | undefined,
              });

              console.log(
                "[Better-Auth Hook] External customer created:",
                externalCustomer,
              );
            } catch (error) {
              console.error(
                "[Better-Auth Hook] Failed to sync with external API:",
                error,
              );
            }
          }
        },
      },
    },
  },
});
