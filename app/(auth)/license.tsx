import { ScrollView, View } from "react-native"
import { router, useLocalSearchParams } from "expo-router"
import { useLicense } from "@/components/auth/hooks/useLicense"
import Pagination from "@/components/global/Pagination"
import Tab from "@/components/global/Tab"
import Title from "@/components/global/Title"
import UploadCard from "@/components/global/UploadCard"

const License: React.FC = () => {
    const params = useLocalSearchParams()
    const { onNext } = useLicense(params)

    const goBack = () => router.back()

    console.log(params)

    return (
        <ScrollView className="flex-1 bg-white dark:bg-black" contentContainerStyle={{ flexGrow: 1 }}>
            <View className="flex-1 pt-14 px-6">
                <Tab goBack={goBack} />

                <View className="flex justify-center items-start gap-6 pt-6">
                    <Title text="Личная информация" subTitle="" />
                    <View className="flex flex-wrap flex-row items-start gap-6">
                        <UploadCard width={150} height={100} text="Водительские права" photoKey="license" />
                        <UploadCard width={150} height={100} text="Фото с водительскими..." photoKey="selfie" />
                    </View>
                </View>

                <View className="mt-auto mb-5">
                    <Pagination num="2" max="4" len={50} next={onNext} back={goBack} />
                </View>
            </View>
        </ScrollView>
    )
}

export default License