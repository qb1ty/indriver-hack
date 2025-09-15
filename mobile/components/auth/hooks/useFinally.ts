import { router, UnknownOutputParams } from 'expo-router'
import axios, { AxiosError } from "axios"
import { usePhotos } from "@/context/context"
import { setToken } from '../utils/token.utils'
import { Alert } from 'react-native'

export const useFinally = (data: UnknownOutputParams) => {
    const { photos, resetPhoto } = usePhotos()

    const onSubmit = async () => {
        const formData = new FormData()

        formData.append("first_name", data.firstName as string)
        formData.append("last_name", data.lastName as string)
        formData.append("password", data.password as string)
        formData.append("role", "driver")
        formData.append("inn", data.IIN as string)

        formData.append('image', {
            uri: photos.personal,
            name: data.userPhoto,
            type: 'image/jpg'
        } as any)

        formData.append('car_front', {
            uri: photos.carFront,
            name: data.carFrontPhoto,
            type: 'image/jpg'
        } as any)

        formData.append('car_left', {
            uri: photos.carSide,
            name: data.carSidePhoto,
            type: 'image/jpg'
        } as any)

        formData.append('car_in', {
            uri: photos.carInterior,
            name: data.carInterior,
            type: 'image/jpg'
        } as any)

        formData.append('car_back', {
            uri: photos.carBack,
            name: data.carBackPhoto,
            type: 'image/jpg'
        } as any)

        formData.append('driver_license', {
            uri: photos.license,
            name: data.licensePhoto,
            type: 'image/jpg'
        } as any)

        formData.append('driver_license_face', {
            uri: photos.selfie,
            name: data.selfiePhoto,
            type: 'image/jpg'
        } as any)
        
        try {
            const response = await axios.post("http://localhost:8000/api/users/sign-up/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                }
            })
            console.log("Ответ сервера:", response.data)
            setToken("refresh", response.data.refresh)
            setToken("access", response.data.access)

            resetPhoto("carBack")
            resetPhoto("carFront")
            resetPhoto("carInterior")
            resetPhoto("carSide")
            router.push("/home")
        } catch (e) {
            const err = e as AxiosError
            Alert.alert(err.message)
            console.error("Ошибка при регистрации:", err.response?.data ?? err.message)
        }
    }

    return {
        onSubmit
    }
}