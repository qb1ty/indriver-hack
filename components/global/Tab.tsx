import { View, Text, Pressable, Linking, useColorScheme } from 'react-native'
import { X } from 'lucide-react-native'

interface ITab{
    goBack: () => void
}


const Tab: React.FC<ITab> = ({ goBack }) => {
    const colorScheme = useColorScheme()

    const redWhat = () => Linking.openURL(`whatsapp://send?phone=+77775812260&text=Мне нужна помощь, пишу с приложения AIndriver`)

    return (
        <View className="flex flex-row justify-between items-center">
            <X onPress={goBack} color={colorScheme === "dark" ? "#FFFFFF" : "#000000"} size={20} strokeWidth={1.5} hitSlop={20} />
            <Pressable onPress={redWhat}>
                <Text className="font-montserrat-semibold text-[#5199FF]">Помощь</Text>
            </Pressable>
        </View>
    )
}

export default Tab