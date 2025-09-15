import { InputModeOptions, TextInput } from "react-native"
import { LoginKeys } from "../types/login.types"

interface IInput {
    value: string
    type: InputModeOptions
    placeholder: string
    handleChange: (value: string) => void
}

const Input: React.FC<IInput> = ({ value, type, placeholder, handleChange }) => {
    return (
        <TextInput
            value={value}
            onChangeText={handleChange}
            inputMode={type}
            textContentType="none"
            autoComplete="off"
            className="font-montserrat-semibold bg-[#F1F2F2] rounded-[10px] text-sm px-4 pt-8 pb-2 z-20"
            placeholder={placeholder}
        />
    )
}

export default Input