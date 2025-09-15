import { InputModeOptions, TextInput } from "react-native"
import { LoginKeys } from "../types/login.types"

interface IInputSecure {
    value: string
    type: InputModeOptions
    placeholder: string
    isSecure: boolean
    handleChange: (value: string) => void
}

const InputSecure: React.FC<IInputSecure> = ({ value, type, isSecure, placeholder, handleChange }) => {
    return (
        <TextInput
            value={value}
            onChangeText={handleChange}
            secureTextEntry={isSecure}
            inputMode={type}
            textContentType="none"
            autoComplete="off"
            className="font-montserrat-semibold bg-[#F1F2F2] rounded-[10px] text-sm px-4 pt-8 pb-2 z-20"
            placeholder={placeholder}
        />
    )
}

export default InputSecure