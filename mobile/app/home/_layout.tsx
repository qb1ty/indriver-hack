import { Stack } from "expo-router"

const HomeLayout: React.FC = () => {
    return (
        <Stack screenOptions={{ headerShown: false, gestureEnabled: false, navigationBarHidden: true }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="cardetection" />
            <Stack.Screen name="errorpage" />
            <Stack.Screen name="goodpage" />
        </Stack>
    )
}

export default HomeLayout