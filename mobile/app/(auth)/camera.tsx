import { useContext, useRef, useState } from "react"
import { router, useLocalSearchParams } from "expo-router"
import { CameraType, CameraView, FlashMode } from "expo-camera"
import { Pressable, View } from "react-native"
import { X, RefreshCw, Zap, ZapOff } from "lucide-react-native"
import { PhotoContext } from "@/context/context"

const Camera: React.FC = () => {
    const { key } = useLocalSearchParams<{ key: string }>()
    const { setPhoto } = useContext(PhotoContext)
    const [facing, setFacing] = useState<CameraType>("back")
    const [torch, setTorch] = useState<boolean>(false)
    const cameraRef = useRef<CameraView | null>(null)

    const goBack = () => router.back()


    const takePhoto = async () => {
        try {
            const photo = await cameraRef.current?.takePictureAsync({
                quality: 1,
                skipProcessing: true
            })

            if (photo && key) {
                setPhoto(key as any, photo.uri)
                router.back()
            }
        } catch (e) {
            console.log("Ошибка фото", e)
        }
    }

    const toggleCameraFacing = () => {
        setFacing(current => (current === "back" ? "front" : "back"))
    }

    const toggleCameraFlash = () => {
        setTorch(prev => !prev)
    }

    return (
        <View className="flex-1 justify-center">
            <CameraView ref={cameraRef} facing={facing} enableTorch={torch} style={{ flex: 1 }} />

            <View className="relative flex flex-row justify-between items-center w-full h-[150px] bg-black px-16">
                <X onPress={goBack} size={32} color="#FFFFFF" strokeWidth={1.5} hitSlop={50} />
                <Pressable onPress={takePhoto} className="rounded-full border-4 border-slate-200 p-1">
                    <View className="w-16 h-16 rounded-full bg-slate-200" />
                </Pressable>
                <RefreshCw onPress={toggleCameraFacing} size={32} color="#FFFFFF" strokeWidth={1.5} hitSlop={50} />
                <View className="absolute top-3 right-5">
                    {torch
                        ? <Zap onPress={toggleCameraFlash} size={20} color="#FFFFFF" strokeWidth={1.5} hitSlop={50} />
                        : <ZapOff onPress={toggleCameraFlash} size={20} color="#FFFFFF" strokeWidth={1.5} hitSlop={50} />}
                </View>
            </View>
        </View>
    )
}

export default Camera
