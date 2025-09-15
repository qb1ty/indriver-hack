import axios from 'axios';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { Provider } from '@/context/context';
import { getToken } from '@/components/auth/utils/token.utils';
import * as SplashScreen from 'expo-splash-screen';
import 'react-native-reanimated';
import '@/global.css';

export {
  ErrorBoundary,
} from 'expo-router'

export const unstable_settings = {
  initialRouteName: "(auth)",
}

SplashScreen.preventAutoHideAsync()

const RootLayout: React.FC = () => {
  const [fontsLoaded] = useFonts({
    "Montserrat-Regular": require('@/assets/fonts/Montserrat-Regular.ttf'),
    "Montserrat-Medium": require('@/assets/fonts/Montserrat-Medium.ttf'),
    "Montserrat-Bold": require('@/assets/fonts/Montserrat-Bold.ttf'),
    "Montserrat-SemiBold": require('@/assets/fonts/Montserrat-SemiBold.ttf')
  })

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  useEffect(() => {
    const validate = async () => {
      try {
        const refresh = getToken("refresh")
        await axios.post("http://localhost:8000/api/users/token-valid/", { refresh })
        // router.push("/home")
      } catch (e) {
        console.log(e)
      }
    }

    validate()
  }, [])

  if (!fontsLoaded) return null

  return <RootLayoutNav />
}

const RootLayoutNav: React.FC = () => {
  const colorScheme = useColorScheme()

  return (
    <Provider>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <StatusBar style={colorScheme === "dark" ? "light" : "dark"} />
        <Stack screenOptions={{ headerShown: false, gestureEnabled: false, navigationBarHidden: true }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="home" />
        </Stack>
      </ThemeProvider>
    </Provider>
  )
}

export default RootLayout