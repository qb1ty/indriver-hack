import { useContext, useState } from "react"
import { Alert } from "react-native"
import { router } from "expo-router"
import { usePhotos } from "@/context/context"
import { RegisterRules, RegisterState } from "../types/register.types"

export const useRegister = () => {
    const { photos } = usePhotos()
    const [registerState, setRegiterState] = useState<RegisterState>({
        IIN: {
            value: "",
            message: "",
            hasError: false
        },
        firstName: {
            value: "",
            message: "",
            hasError: false
        },
        lastName: {
            value: "",
            message: "",
            hasError: false
        },
        password: {
            value: "",
            message: "",
            hasError: false
        }
    })

    const rules: RegisterRules[] = [
        { check: (value: string) => value.trim().length === 0, field: "firstName", message: "Имя объязательно" },
        { check: (value: string) => value.trim().length === 0, field: "lastName", message: "Фамилия объязательно" },
        { check: (value: string) => value.trim().length !== 12, field: "IIN", message: "ИИН должен состоять из 12 символов" },
        { check: (value: string) => value.length < 8 || value.length > 24, field: "password", message: "Пароль должен содержать от 8 до 24 символов." }
    ]

    const changeValue = (field: keyof RegisterState) => (value: string) => {
        setRegiterState(prev => ({
            ...prev,
            [field]: { ...prev[field], value  }
        }))
    }

    const validate = () => {
        let hasError = false

        for (const { check, field, message } of rules) {
            const failed = check(registerState[field].value)

            setRegiterState(prev => ({
                ...prev,
                [field]: { ...prev[field], message, hasError: failed }
            }))

            if (failed) hasError = true
        }

        return !hasError
    }

    const onNext = () => {
        if (!validate()) {
            Alert.alert("Ошибки в форме", "Исправьте ошибки в форме")
            return
        }

        if (!photos.personal) {
            Alert.alert("Нету фото", "Сделайте фото перед отправкой")
            return
        }

        
        try {
            const fileName = photos.personal.split('/').pop() || 'photo.jpg'

            router.push({
                pathname: "/license",
                params: {
                    firstName: registerState.firstName.value,
                    lastName: registerState.lastName.value,
                    IIN: registerState.IIN.value,
                    password: registerState.password.value,
                    userPhoto: fileName
                }
            })
        } catch (e) {
            console.log("Ошибка при переходе: ", e)
        }
    }

    return {
        registerState,
        changeValue,
        onNext
    }
}