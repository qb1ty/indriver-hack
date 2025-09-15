import { useState } from "react"
import { ScrollView, Text, View } from "react-native"
import { router } from "expo-router"
import { useRegister } from "@/components/auth/hooks/useRegister"
import Tab from "@/components/global/Tab"
import Title from "@/components/global/Title"
import UploadCard from "@/components/global/UploadCard"
import Input from "@/components/auth/ui/Input"
import ErrorText from "@/components/auth/ui/ErrorText"
import InputSecure from "@/components/auth/ui/InputSecure"
import ToggleSecure from "@/components/auth/ui/ToggleSecure"
import Pagination from "@/components/global/Pagination"

const Register: React.FC = () => {
    const { registerState, changeValue, onNext } = useRegister()
    const [isSecure, setIsSecure] = useState<boolean>(true)

    const toggleSecure = (): void => setIsSecure(prev => !prev)
    const goBack = () => router.push("/(auth)")
    
    return (
        <ScrollView className="flex-1 bg-white dark:bg-black" contentContainerStyle={{ flexGrow: 1 }}>
            <View className="flex-1 pt-14 px-6">
                <Tab goBack={goBack} />

                <View className="flex items-start gap-6 pt-6">
                    <Title text="Личная информация" subTitle="" />

                    <View className="flex flex-wrap flex-row items-center gap-6">
                        <UploadCard width={150} height={100} text="Личная фотография" photoKey="personal" />
                    </View>

                    <View className="flex gap-4 w-full">
                        <View>
                            <View className="relative">
                                <Text className="absolute top-2 left-4 font-montserrat-regular text-sm text-[#6D6E71] z-30">Имя</Text>
                                <Input value={registerState.firstName.value} type="text" placeholder="Введите имя" handleChange={changeValue("firstName")} />
                            </View>
                            <ErrorText hasError={registerState.firstName.hasError} message={registerState.firstName.message} />
                        </View>
                        <View>
                            <View className="relative">
                                <Text className="absolute top-2 left-4 font-montserrat-regular text-sm text-[#6D6E71] z-30">Фамилия</Text>
                                <Input value={registerState.lastName.value} type="text" placeholder="Введите фамилию" handleChange={changeValue("lastName")} />
                            </View>
                            <ErrorText hasError={registerState.lastName.hasError} message={registerState.lastName.message} />
                        </View>
                        <View>
                            <View className="relative">
                                <Text className="absolute top-2 left-4 font-montserrat-regular text-sm text-[#6D6E71] z-30">ИИН</Text>
                                <Input value={registerState.IIN.value} type="numeric" placeholder="Введите свой ИИН" handleChange={changeValue("IIN")} />
                            </View>
                            <ErrorText hasError={registerState.IIN.hasError} message={registerState.IIN.message} />
                        </View>
                        <View>
                            <View className="relative">
                                <Text className="absolute top-2 left-4 font-montserrat-regular text-sm text-[#6D6E71] z-30">Пароль</Text>
                                <InputSecure value={registerState.password.value} type="text" isSecure={isSecure} placeholder="Введите свой пароль" handleChange={changeValue("password")} />
                                <ToggleSecure color="#000000" isSecure={isSecure} toggleSecure={toggleSecure} />
                                <ErrorText hasError={registerState.password.hasError} message={registerState.password.message} />
                            </View>
                        </View>
                    </View>
                </View>

                <View className="mt-auto mb-5">
                    <Pagination num="1" max="4" len={25} next={onNext} back={goBack} />
                </View>
            </View>
        </ScrollView>
    )
}

export default Register