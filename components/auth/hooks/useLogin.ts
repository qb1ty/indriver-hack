import { useState } from "react"
import { LoginState, LoginRules, LoginKeys } from "../types/login.types"
import axios from "axios"
import { setToken } from "../utils/token.utils"
import { router } from "expo-router"

export const useLogin = () => {
    const [loginState, setLoginState] = useState<LoginState>({
        IIN: { hasError: false, message: "", value: "" },
        password: { hasError: false, message: "", value: "" }
    })

    const rules: LoginRules[] = [
        { check: (value: string) => value.trim().length !== 12, field: "IIN", message: "ИИН должен состоять из 12 символов" },
        { check: (value: string) => value.length < 8 || value.length > 24, field: "password", message: "Пароль должен содержать от 8 до 24 символов." }
    ]

    const changeValue = (field: keyof LoginState) => (value: string) => {
        setLoginState(prev => ({
            ...prev,
            [field]: { ...prev[field], value },
        }))
    }

    const validate = () => {
        let hasError = false

        for (const { check, field, message } of rules) {
            const failed = check(loginState[field].value)

            setLoginState(prev => ({
                ...prev,
                [field]: { ...prev[field], message, hasError: failed }
            }))

            if (failed) hasError = true
        }

        return !hasError
    }

    const onSubmit = async () => {
        if (!validate()) return

        try {
            // Логика отправки данных на сервер
            const response = await axios.post("http://192.168.0.10:8000/api/users/sign-in/", {
                "inn": loginState.IIN.value,
                "password": loginState.password.value
            })

            setToken("refresh", response.data.refresh)
            setToken("access", response.data.access)

            router.push("/home")
        } catch (e) {
            console.log("Ошибка входа: ", e)
        }
    }
    
    return {
        loginState,
        changeValue,
        onSubmit
    }
}