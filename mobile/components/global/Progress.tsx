import { View } from "react-native"

interface IProgress {
    width: number
}

const Progress: React.FC<IProgress> = ({ width }) => {
    return (
        <View className="rounded-[10px] relative w-[150px] h-[6px] bg-[#D9D9D9]">
            <View style={{ width: `${width}%` }} className="rounded-[10px] absolute top-0 left-0 right-0 bottom-0 bg-[#C0F11C]" />
        </View>
    )
}

export default Progress