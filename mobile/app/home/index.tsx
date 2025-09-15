import { View, Image, Text, Pressable} from 'react-native'
import { router } from "expo-router";
import Ionicons from '@expo/vector-icons/Ionicons';
import Card from '@/components/main/ui/Сard'




const Home: React.FC = () => {
  const goNext = ()=> {
    router.push('/home/cardetection')
  }
  
  return (
    <View  className="flex-1 gap-10 items-center pt-14 px-6">
      <Card Mtitle='Получайте доход с нами' subtitle={['Гибкий график', 'Ваши цены', 'Низкая плата за сервис']} img={[""]}/>

      <Pressable onPress={goNext}className=' justify-between bg-white items-center flex-row w-full py-4 px-2 rounded-[16px]'>

        <View className='gap-3 flex-row items-center '>
          <Image
            className="w-[100px] h-[50px]"
            style={{ transform: [{ scaleX: -1 }] }}
            source={require("@/assets/png/car.png")}/>
            <Text className='text-lg font-montserrat-medium'>
              Водитель
            </Text>
        </View>
        <Ionicons name="chevron-forward-outline" size={22} color="#000" />

      </Pressable>

    </View>
  )
}


export default Home