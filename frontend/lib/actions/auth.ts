'use server'

import { signUpSchema } from "../zod/auth";
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

            console.log('Response status:', response.status)
            console.log('Response ok:', response.ok)

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