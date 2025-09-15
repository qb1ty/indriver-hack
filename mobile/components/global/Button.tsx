import { Pressable, Text } from "react-native"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"

interface IButton {
    text: string
    fn: () => void
}

const Button: React.FC<IButton> = ({ text, fn }) => {
    const color = useSharedValue<string>("#C0F11C")

    const animatedStyle = useAnimatedStyle(() => ({
        backgroundColor: color.value,
        borderRadius: 10
    }))

    return (
        <Animated.View style={animatedStyle}>
            <Pressable
                onPress={fn}
                onPressIn={() => {
                    color.value = withTiming("#b7e37f", { duration: 200 })
                }}
                onPressOut={() => {
                    color.value = withTiming("#C0F11C", { duration: 200 })
                }}
                className="w-full py-4"
            >
                <Text className="font-montserrat-bold text-lg text-center text-black">{ text }</Text>
            </Pressable>
        </Animated.View>
    )
}

export default Button