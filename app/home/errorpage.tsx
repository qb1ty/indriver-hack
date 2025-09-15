import { View, Text } from 'react-native'
import React from 'react'
import { X } from 'lucide-react-native';
import Button from '@/components/global/Button';
import { router } from 'expo-router';

const errorpage: React.FC = () => {
    const data =[
        { id: 1, title: 'Фото размыто.' },
        { id: 2, title: 'Машина не полностью в кадре. Сфотографируйте целиком.' },
        { id: 3, title: 'Освещение слишком слабое. Сделайте фото при хорошем свете.' },
        { id: 4, title: 'Не видно номерных знаков. Сфотографируйте машину спереди/сзади.' },
    ]

    const back =()=> {
        router.back()
    }

    return (
        <View className='flex-1 bg-white pt-[46px] items-center  px-4 '>
            <X size={220} color={'#FF3B30'}/>
            <View className='gap-2'>
                {data.map(({ id, title }) => (
                    <View className='flex-row items-center gap-3 mx-3' key={id}>
                        <View className='bg-[#C0F11C] rounded-[10px] w-2 h-2'/>
                        <Text className='font-montserrat-semibold text-left text-lg'>{title}</Text>
                    </View>
                ))}
                <View className='mt-[24px] mx-2'>
                    <Button text={'Переснять'} fn={back} />
                </View>
            </View>
        </View>
    )
}

export default errorpage