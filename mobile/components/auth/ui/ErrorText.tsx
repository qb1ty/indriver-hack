import { Text } from "react-native"

interface IErrorText {
    hasError: boolean
    message: string
}

const ErrorText: React.FC<IErrorText> = ({ hasError, message }) => {
    return hasError && <Text className="font-montserrat-regular text-sm text-red-500 -rotate-1">{ message }</Text>
}

export default ErrorText