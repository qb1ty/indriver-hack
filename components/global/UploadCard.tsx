import { useColorScheme, Image, Pressable, Text, View } from "react-native"
import { CameraView, useCameraPermissions } from "expo-camera"
import { router } from "expo-router"
import { Plus, X } from "lucide-react-native"
import { PhotoKeys, usePhotos } from "@/context/context"

interface UploadCardProps {
  width: number
  height: number
  text: string
  photoKey: PhotoKeys
}

const UploadCard: React.FC<UploadCardProps> = ({ width, height, text, photoKey }) => {
    const { photos, setPhoto } = usePhotos()
    const [permission, requestPermission] = useCameraPermissions()
    const colorScheme = useColorScheme()

    const plusColor = colorScheme === "dark" ? "#FFFFFF" : "#000000"
    const currentPhoto = photos[photoKey]

    const handlePress = async () => {
        if (!permission?.granted) {
            await requestPermission()
        }

        router.push({
            pathname: "/camera",
            params: {
                key: photoKey
            }
        })
    }

    const removePhoto = () => setPhoto(photoKey, "")

    return (
        <View className="relative flex items-center gap-3 w-[40%]">
            <Pressable
                onPress={handlePress}
                style={{ width, height }}
                className="relative flex justify-center items-center rounded-[10px] bg-[#dedede]"
            >
                {currentPhoto ? (
                    <Image
                    source={{ uri: currentPhoto }}
                    className="absolute top-0 left-0 right-0 bottom-0 rounded-[10px]"
                    />
                ) : (
                    <Plus color={plusColor} size={28} strokeWidth={1.5} />
                )}
            </Pressable>

            <Text className="font-montserrat-regular text-sm text-center">{text}</Text>

            {currentPhoto && (
                <View className="absolute -top-2 -right-3 bg-[#6D6E71] rounded-full p-1">
                    <X
                    onPress={removePhoto}
                    color="#FFFFFF"
                    size={16}
                    strokeWidth={1.5}
                    hitSlop={20}
                    />
                </View>
            )}
        </View>
    )
}

export default UploadCard;
