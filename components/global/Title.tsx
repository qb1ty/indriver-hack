import { Text, View } from "react-native"

interface ITitle {
    text: string
    subTitle: string
}

const Title: React.FC<ITitle> = ({ text, subTitle }) => {
    return (
        <View className="flex items-start gap-3">
            <Text className="font-montserrat-bold text-2xl text-black dark:text-white">{text}</Text>
            { !!subTitle && <Text className="font-montserrat-medium text-lg text-[#212122] dark:text-white">{subTitle}</Text> }
        </View>
    )
}

export default Title