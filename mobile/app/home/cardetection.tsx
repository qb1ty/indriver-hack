
import { View } from 'react-native'
import { router } from 'expo-router'
import { useCardetection } from '@/components/main/hooks/useCardetection'
import Tab from '@/components/global/Tab'
import Title from '@/components/global/Title'
import UploadCard from '@/components/global/UploadCard'
import ButtonM from '@/components/global/Pagination';

const Cardetection: React.FC = () => {
  const { onSubmit } = useCardetection()

  const close = () => {
    router.push('/home')
  }

  const back = () => {
    router.back()
  }

  return (
    <View className='flex-1 bg-white pt-14'>
      {/* Контентная часть */}
      <View className='flex-1 mx-4'>
        <Tab goBack={close} />

        <Title
          text='Сделайте фото автомобиля'
          subTitle='Фото должно быть четким, без бликов и посторонних предметов'
        />

        <View className="mt-4 flex flex-wrap flex-row justify-between items-center gap-6">
          <UploadCard width={160} height={100} text="Сфотографируйте спереди" photoKey="carFront" />
          <UploadCard width={160} height={100} text="Сфотографируйте сбоку" photoKey="carSide" />
          <UploadCard width={160} height={100} text="Сфотографируйте сзади" photoKey="carBack" />
          <UploadCard width={160} height={100} text="Сфотографируйте салон" photoKey="carInterior" />
        </View>
      </View>

      {/* Футер (прижат к низу) */}
      <View className='mx-4 mb-4'>
        <ButtonM num='1' max="2" len={50} next={onSubmit} back={back} />
      </View>
    </View>
  )
}

export default Cardetection
