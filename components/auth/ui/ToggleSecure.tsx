import { Pressable } from "react-native"
import { Eye, EyeOff } from "lucide-react-native"

interface IToggleSecure {
    color: string
    isSecure: boolean
    toggleSecure: () => void
}

const ToggleSecure: React.FC<IToggleSecure> = ({ color, isSecure, toggleSecure }) => {
    return (
        <Pressable onPress={toggleSecure} className="absolute top-7 right-3 z-30" hitSlop={20}>
            {isSecure
                ? <EyeOff color={color} size={18} strokeWidth={1.5} />
                : <Eye color={color} size={18} strokeWidth={1.5} />}
        </Pressable>
    )
}

export default ToggleSecure