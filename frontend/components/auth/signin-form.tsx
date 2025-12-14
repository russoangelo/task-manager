'use client'

import { signInAction, signUpAction } from "@/lib/actions/auth"
import { SignInProps } from "@/lib/types"
import { signInSchema, signUpSchema } from "@/lib/zod/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAction } from "next-safe-action/hooks"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Input } from "../ui/input"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { Spinner } from "../ui/spinner"

export const SignInForm = () => {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInProps>({
        resolver: zodResolver(signInSchema)
    })

    const { execute, isExecuting } = useAction(signInAction, {
        onSuccess: () => {
            router.push("/")
        },
        onError: ({ error }) => {
            toast.error(error.serverError)
        }
    })

    return (
        <form onSubmit={handleSubmit((data) => {
            execute(data)
        })}>
            <div className="flex flex-col gap-y-6">
                <label>
                    <span className="mb-2 block text-sm font-medium">
                        Email
                    </span>
                    <Input
                        type="email"
                        placeholder="luigirossi@gmail.com"
                        {...register("email")}
                    />
                    {errors.email && (
                        <span className="mt-2 block text-sm text-red-500">{errors.email.message}</span>
                    )}
                </label>
                <label>
                    <span className="mb-2 block text-sm font-medium">
                        Password
                    </span>
                    <Input
                        type="password"
                        {...register("password")}
                    />
                    {errors.password && (
                        <span className="mt-2 block text-sm text-red-500">{errors.password.message}</span>
                    )}
                </label>
                <Button
                    type="submit"
                    variant={isExecuting ? "outline" : "default"}
                    disabled={isExecuting}
                >
                    {isExecuting && <Spinner/>}
                    Sign Up
                </Button>
            </div>
        </form>
    )
}