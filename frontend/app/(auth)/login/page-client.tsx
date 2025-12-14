import { SignInForm } from "@/components/auth/signin-form"
import Link from "next/link"

export default function SignIn() {
    return (
        <>
            <div className="w-full max-w-sm">
                <h3 className="text-center text-xl font-semibold">
                    Log in to your account
                </h3>
                <div className="mt-8">
                    <SignInForm />
                </div>
                <p className="mt-6 text-center text-sm font-medium text-neutral-500">
                    Don't have an account?&nbsp;
                    <Link
                        href="/register"
                        className="font-semibold text-neutral-700 transition-colors hover:text-neutral-900"
                    >
                        Sign Up
                    </Link>
                </p>
            </div>
        </>
    )
}