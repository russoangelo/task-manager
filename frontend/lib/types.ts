import { z } from "zod";
import { signUpSchema, signInSchema } from "./zod/auth";

export type SignUpProps = z.infer<typeof signUpSchema>
export type SignInProps = z.infer<typeof signInSchema>