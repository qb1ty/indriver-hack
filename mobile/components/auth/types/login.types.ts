type FieldState<T = string> = {
    hasError: boolean
    message: string
    value: T
}

export type LoginKeys = "IIN" | "password"
export type LoginState = {
    [K in LoginKeys]: FieldState
}
export type LoginRules = {
    check: (value: string) => boolean
    field: keyof LoginState
    message: string
}