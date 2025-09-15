import { Text, View } from "react-native"
import { Href, Link } from "expo-router"

interface IActionLink {
    href: Href
    text: string
    link: string
}

const ActionLink: React.FC<IActionLink> = ({ href, text, link }) => {
    return (
        <View className="flex justify-center items-center mt-auto mb-10">
            <Text className="font-montserrat-medium text-center text-black dark:text-white">
                {text}{" "}
                <Link href={href}>
                    <Text className="font-montserrat-medium text-center text-[#C0F11C]">{link}</Text>
                </Link>
            </Text>
        </View>
    )
}

export default ActionLink