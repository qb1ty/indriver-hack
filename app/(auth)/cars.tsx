import { ScrollView, View } from "react-native"
import { router, useLocalSearchParams } from "expo-router"
import { useCars } from "@/components/auth/hooks/useCars"
import Pagination from "@/components/global/Pagination"
import Tab from "@/components/global/Tab"
import Title from "@/components/global/Title"
import UploadCard from "@/components/global/UploadCard"

const Cars: React.FC = () => {
    const params = useLocalSearchParams()
    const { onNext } = useCars(params)

    const goBack = () => router.back()

    console.log(params)

    return (
        <ScrollView className="flex-1 bg-white dark:bg-black" contentContainerStyle={{ flexGrow: 1 }}>
            <View className="flex-1 pt-14 px-6">
                <Tab goBack={goBack} />

                <View className="flex justify-center items-start gap-6 pt-6">
                    <Title text="Личная информация" subTitle="" />
                    <View className="flex flex-wrap flex-row justify-between items-start gap-6">
                        <UploadCard width={160} height={100} text="Сфотографируйте спереди" photoKey="carFront" />
                        <UploadCard width={160} height={100} text="Сфотографируйте сбоку" photoKey="carSide" />
                        <UploadCard width={160} height={100} text="Сфотографируйте сзади" photoKey="carBack" />
                        <UploadCard width={160} height={100} text="Сфотографируйте салон" photoKey="carInterior" />
                    </View>
                </View>

                <View className="mt-auto mb-5">
                    <Pagination num="3" max="4" len={75} next={onNext} back={goBack} />
                </View>
            </View>
        </ScrollView>
    )
}

export default Cars