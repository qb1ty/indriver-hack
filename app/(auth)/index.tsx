import { useState } from 'react'
import { View, Text, Pressable, TextInput, TouchableWithoutFeedback, Keyboard, useColorScheme } from 'react-native'
import { router } from 'expo-router'
import { useLogin } from '@/components/auth/hooks/useLogin'
import ToggleSecure from '@/components/auth/ui/ToggleSecure'
import ErrorText from '@/components/auth/ui/ErrorText'
import Button from '@/components/global/Button'
import ActionLink from '@/components/auth/ui/ActionLink'
import Input from '@/components/auth/ui/Input'
import InputSecure from '@/components/auth/ui/InputSecure'

const Login: React.FC = () => {
    const colorScheme = useColorScheme()
    const [isSecure, setIsSecure] = useState<boolean>(true)
    const { loginState, changeValue, onSubmit } = useLogin()

    const toggleSecure = (): void => setIsSecure(prev => !prev)

    const handlePress = () => {
        router.push("/home")
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
            <View className="flex-1 pt-14 px-6 bg-white dark:bg-black">
                <View className="flex gap-4">
                    <Text className="font-montserrat-bold text-xl tracking-tighter pb-2 dark:text-white">Войдите по ИИН</Text>

                    <View>
                        <View className="relative">
                            <Text className="absolute top-2 left-4 font-montserrat-regular text-sm text-[#6D6E71] z-30">ИИН</Text>
                            <Input value={loginState.IIN.value} type="numeric" placeholder="Введите свой ИИН" handleChange={changeValue("IIN")} />
                        </View>
                        <ErrorText hasError={loginState.IIN.hasError} message={loginState.IIN.message} />
                    </View>

                    <View>
                        <View className="relative">
                            <Text className="absolute top-2 left-4 font-montserrat-regular text-sm text-[#6D6E71] z-30">Пароль</Text>
                            <InputSecure value={loginState.password.value} type="text" isSecure={isSecure} placeholder="Введите свой пароль" handleChange={changeValue("password")} />
                            <ToggleSecure color="#000000" isSecure={isSecure} toggleSecure={toggleSecure} />
                            <ErrorText hasError={loginState.password.hasError} message={loginState.password.message} />
                        </View>
                    </View>

                    <Button text="Войти" fn={onSubmit} />
                </View>

                <ActionLink
                    href="/register"
                    text="Нет аккаунта?"
                    link="Регистрация"
                />
            </View>
        </TouchableWithoutFeedback>
    )
}

export default Login