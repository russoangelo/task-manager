'use client'

import { signUpAction } from "@/lib/actions/auth"
import { SignUpProps } from "@/lib/types"
import { signUpSchema } from "@/lib/zod/auth"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAction } from "next-safe-action/hooks"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { Input } from "../ui/input"
import { toast } from "sonner"
import { Button } from "../ui/button"
import { Spinner } from "../ui/spinner"

export const SignUpForm = () => {
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpProps>({
        resolver: zodResolver(signUpSchema)
    })

    const { execute, isExecuting } = useAction(signUpAction, {
        onSuccess: () => {
            router.push("/login")
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
                        Name
                    </span>
                    <Input
                        type="text"
                        placeholder="Your name"
                        {...register("name")}
                    />
                    {errors.name && (
                        <span className="mt-2 block text-sm text-red-500">{errors.name.message}</span>
                    )}
                </label>
                <label>
                    <span className="mb-2 block text-sm font-medium">
                        Surname
                    </span>
                    <Input
                        type="text"
                        placeholder="Your surname"
                        {...register("surname")}
                    />
                    {errors.surname && (
                        <span className="mt-2 block text-sm text-red-500">{errors.surname.message}</span>
                    )}
                </label>
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