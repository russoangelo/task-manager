import { SignUpForm } from "@/components/auth/signup-form"
import Link from "next/link"

export default function SignUp() {
    return (
        <>
            <div className="w-full max-w-sm">
                <h3 className="text-center text-xl font-semibold">
                    Create your account
                </h3>
                <div className="mt-8">
                    <SignUpForm />
                </div>
                <p className="mt-6 text-center text-sm font-medium text-neutral-500">
                    Already have an account?&nbsp;
                    <Link
                        href="/login"
                        className="font-semibold text-neutral-700 transition-colors hover:text-neutral-900"
                    >
                        Log in
                    </Link>
                </p>
            </div>
        </>
    )
}