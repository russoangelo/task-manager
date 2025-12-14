'use server'

import { cookies } from "next/headers";
import { signInSchema, signUpSchema } from "../zod/auth";
import { actionClient } from "./safe-action";

export const signUpAction = actionClient
    .schema(signUpSchema)
    .action(async ({ parsedInput }) => {
        try {
            const response = await fetch(`${process.env.BACKEND_LOCATION}/api/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(parsedInput)
            })

            if (!response.ok) {
                throw new Error("invalid-credentials")
            }

            const data = await response.json()

            return {
                success: true,
                user: data.email
            }
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "network-error")
        }
    })

export const signInAction = actionClient
    .schema(signInSchema)
    .action(async ({ parsedInput }) => {
        try {
            const response = await fetch(`${process.env.BACKEND_LOCATION}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(parsedInput)
            })

            if (!response.ok) {
                throw new Error("invalid-credentials")
            }

            const data = await response.json()

            const { accessToken, refreshToken } = data;

            const cookieStore = await cookies()

            cookieStore.set('access_token', accessToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                maxAge: 60 * 15,
            });

            cookieStore.set('refresh_token', refreshToken, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'lax',
                path: '/',
                maxAge: 60 * 60 * 24 * 7,
            });

            return { success: true }

        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "network-error")
        }
    })