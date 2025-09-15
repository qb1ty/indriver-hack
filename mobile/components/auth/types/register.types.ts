type FieldState<T = string> = {
    hasError: boolean
    message: string
    value: T
}

export type RegisterKeys = "firstName" | "lastName" | "IIN" | "password"
export type RegisterState = {
    [K in RegisterKeys]: FieldState
}
export type RegisterRules = {
    check: (value: string) => boolean
    field: keyof RegisterState
    message: string
}