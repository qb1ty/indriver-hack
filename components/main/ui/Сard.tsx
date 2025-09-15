import { Image, View, Text } from 'react-native'

interface ICard {
    Mtitle?: string;
    subtitle: string[]; 
    img: any[]
};

const Card: React.FC<ICard> = ({ Mtitle = "", subtitle, img }) => {
    return (
        <View className='flex gap-4 bg-[#E8FFAF] rounded-[20px] w-full py-6 px-4'>
                <Text className='font-montserrat-bold text-xl'>{Mtitle}</Text>
                {subtitle.map((item, index) => (
                    <View className='flex flex-row items-center gap-2' key={index}>
                        <View className='w-[20px] h-[20px] rounded-full bg-white' />
                        <Text className='text-base font-montserrat-medium'>{item}</Text>
                    </View>
                ))}
        </View>
    )
}


export default Card