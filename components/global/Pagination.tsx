
import React from 'react';
import { Image, View, Text, Pressable } from 'react-native';
import { ChevronLeft } from 'lucide-react-native';
import { ChevronRight } from 'lucide-react-native';
import Progress from '@/components/global/Progress';
import ButtonG from '@/components/global/Button';

import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"


interface IPagination {
  num: string;
  len: number;
  next: () => void;
  back: () => void;
  max?: string;
  text?: string;
}

const Pagination: React.FC<IPagination> = ({ num, len, next, back, max = "2", text = "Далее" }) => {
   const color = useSharedValue<string>("#C0F11C")

    const animatedStyle = useAnimatedStyle(() => ({
        backgroundColor: color.value,
        borderRadius: 10
    }))

  return (
    <View className="flex-row justify-between py-4">

      <View className="flex-1">
        <Text className="text-2xl font-montserrat-semibold">{num} из {max}</Text>
        <Progress width={len}/>
    <View >
    </View>
      </View>

      <View className="flex-2 flex-row items-end justify-center">
        <View className='flex-row items-center gap-3'>

            <Pressable onPress={back} className='rounded-[10px] p-3 bg-gray-100 items-center'>
                <ChevronLeft />
            </Pressable>

            <Pressable
             onPressIn={() => {
                    color.value = withTiming("#b7e37f", { duration: 200 })
                }}
                onPressOut={() => {
                    color.value = withTiming("#C0F11C", { duration: 200 })
                }}
            onPress={next} className='p-3 bg-[#C0F11C] flex-row items-center rounded-[10px]'>
                <Text className='text-[16px] font-montserrat-semibold'>{ text }</Text>
                <ChevronRight />
            </Pressable>
          


        </View>
      </View>
    </View>
  );
};

export default Pagination;