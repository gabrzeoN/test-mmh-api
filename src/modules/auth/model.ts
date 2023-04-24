import { Users, Professionals } from "@prisma/client";

export const atLeast_1Lower_1Upper_1Number_Min8Digits = /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
export const maxSizeName = 70;

export type ResetPasswordModel =    Pick<Users | Professionals, "password">

export type ForgotPasswordModel =   Pick<Users | Professionals, "email">

export type SignInModel =           Pick<Users | Professionals, "email" | "password">;

export type SignUpModel =           Pick<Users | Professionals, "name" | "email" | "cpf" | "password">

export type SignUpModelDB =         Pick<Users | Professionals, "name" | "email" | "cpf" | "password" | "tokenTemp">
