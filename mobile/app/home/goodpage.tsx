import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { BadgeCheck } from 'lucide-react-native';
import Button from '@/components/global/Button';
import Title from '@/components/global/Title';
import { router } from 'expo-router';

const goodpage: React.FC = () => {

    const back =()=>{
        router.push("/home")
    }
  return (
    <View className='flex-1 bg-white pt-14 items-center justify-center px-4 gap-10'>

        {/* <TouchableOpacity onPress={back}>
            <Text>Назад</Text>
            </TouchableOpacity> */}

        <BadgeCheck size={120} color={'#C0F11C'}/>

        <Text className='text-xl font-montserrat-semibold'>Проверка пройдена. Удачной смены!</Text>
        
        <View className='w-full'>
            <Button text={'Начать работу'} fn={back}/>
        </View>
        

    </View>
  )
}

export default goodpage