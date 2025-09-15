import { Alert } from "react-native"
import { usePhotos } from "@/context/context"
import { router, UnknownOutputParams } from "expo-router";

export const useLicense = (data: UnknownOutputParams) => {
    const { photos } = usePhotos()

    const onNext = () => {
        if (!photos.license || !photos.selfie) {
            Alert.alert("Нету фото", "Сделайте фото перед отправкой")
            return
        }

        try {
            const licenseFileName = photos.license.split('/').pop() || 'photo.jpg'
            const selfieFileName = photos.selfie.split('/').pop() || 'photo.jpg'

            router.push({
                pathname: "/cars",
                params: {
                    ...data,
                    licensePhoto: licenseFileName,
                    selfiePhoto: selfieFileName
                }
            })
        } catch (e) {
            console.log("Ошибка при переходе: ", e)
        }
    }

    return {
        onNext
    }
}