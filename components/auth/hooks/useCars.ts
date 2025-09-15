import { Alert } from "react-native"
import { router, UnknownOutputParams } from "expo-router"
import { usePhotos } from "@/context/context"

export const useCars = (data: UnknownOutputParams) => {
    const { photos } = usePhotos()

    const onNext = () => {
        if (!photos.carFront || !photos.carSide || !photos.carBack || !photos.carInterior) {
            Alert.alert("Нету фото", "Сделайте фото перед отправкой")
            return
        }

        try {
            const carFrontFileName = photos.carFront.split('/').pop() || 'photo.jpg'
            const carSideFileName = photos.carSide.split('/').pop() || 'photo.jpg'
            const carBackFileName = photos.carBack.split('/').pop() || 'photo.jpg'
            const carInteriorFileName = photos.carInterior.split('/').pop() || 'photo.jpg'

            router.push({
                pathname: "/finally",
                params: {
                    ...data,
                    carFrontPhoto: carFrontFileName,
                    carSidePhoto: carSideFileName,
                    carBackPhoto: carBackFileName,
                    carInterior: carInteriorFileName
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