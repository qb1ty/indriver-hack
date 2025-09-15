import { Link } from 'expo-router';
import { Text, View } from 'react-native';

const NotFoundScreen: React.FC = () => {
  return (
    <>
      <View className="flex-1 justify-center items-center p-5">
        <Text className="font-montserrat-bold text-xl text-white dark:text-white">Нету такой страницы!</Text>

        <Link href="/home" className="mt-4 py-4">
          <Text className="text-sm text-[#2e78b7]">Назад на главную страницу!</Text>
        </Link>
      </View>
    </>
  )
}

export default NotFoundScreen