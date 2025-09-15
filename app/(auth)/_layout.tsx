import { Stack } from 'expo-router';

const AuthLayout: React.FC = () => {
  return (
    <Stack screenOptions={{ headerShown: false, gestureEnabled: false, navigationBarHidden: true }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="register" />
      <Stack.Screen name="camera" />
      <Stack.Screen name="license" />
      <Stack.Screen name="cars" />
      <Stack.Screen name="finally" />
    </Stack>
  )
}

export default AuthLayout