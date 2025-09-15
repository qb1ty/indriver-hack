import axios from "axios"
import { Alert } from "react-native"
import { router } from "expo-router"
import { getToken } from "@/components/auth/utils/token.utils"
import { usePhotos } from "@/context/context"

export const useCardetection = () => {
    const { photos } = usePhotos()
    
    const onSubmit = async () => {
        if (!photos.carFront || !photos.carSide || !photos.carBack || !photos.carInterior) {
            Alert.alert("Нету фото", "Сделайте фото перед отправкой")
            return
        }

        const formData = new FormData()

        const carFrontFileName = photos.carFront.split('/').pop() || 'photo.jpg'
        const carSideFileName = photos.carSide.split('/').pop() || 'photo.jpg'
        const carBackFileName = photos.carBack.split('/').pop() || 'photo.jpg'
        const carInteriorFileName = photos.carInterior.split('/').pop() || 'photo.jpg'

        formData.append('car_front', {
            uri: photos.carFront,
            name: carFrontFileName,
            type: 'image/jpg'
        } as any)

        formData.append('car_left', {
            uri: photos.carSide,
            name: carSideFileName,
            type: 'image/jpg'
        } as any)

        formData.append('car_in', {
            uri: photos.carInterior,
            name: carInteriorFileName,
            type: 'image/jpg'
        } as any)

        formData.append('car_back', {
            uri: photos.carBack,
            name: carBackFileName,
            type: 'image/jpg'
        } as any)

        try {
            const access = getToken("access")
            await axios.post("http://192.168.0.10:8000/api/users/car-valid/", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "Authorization": `Bearer ${access}`
                }
            })

            
            router.push("/home/goodpage")
        } catch (e) {
            router.push("/home/errorpage")
            console.log("Ошибка при переходе: ", e)
        }
    }
    
    return {
        onSubmit
    }
}