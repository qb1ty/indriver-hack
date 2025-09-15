import { ScrollView, View } from "react-native"
import { router, useLocalSearchParams } from "expo-router"
import { useFinally } from "@/components/auth/hooks/useFinally"
import Pagination from "@/components/global/Pagination"
import Tab from "@/components/global/Tab"
import Title from "@/components/global/Title"

const Finally: React.FC = () => {
    const params = useLocalSearchParams()
    const { onSubmit } = useFinally(params)

    const goBack = () => router.back()

    console.log(params)

    return (
        <ScrollView className="flex-1 bg-white dark:bg-black" contentContainerStyle={{ flexGrow: 1 }}>
            <View className="flex-1 pt-14 px-6">
                <Tab goBack={goBack} />

                <View className="flex justify-center items-start gap-6 pt-6">
                    <Title text="Личная информация" subTitle="Проверьте введённые данные и загруженные документы. Если всё верно — нажмите «Отправить». Ваш профиль будет отправлен на модерацию. Проверка занимает до 24 часов." />
                </View>

                <View className="mt-auto mb-5">
                    <Pagination num="4" max="4" text="Отправить" len={100} next={onSubmit} back={goBack} />
                </View>
            </View>
        </ScrollView>
    )
}

export default Finally