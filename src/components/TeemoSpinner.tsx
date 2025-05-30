import { Spinner, Image } from '@heroui/react'
import TeemoFading from '../assets/teemo-fading.gif'

export default function TeemoSpinner() {
  return (
    <div className='h-dvh flex items-center justify-center'>
      <div className='flex flex-col items-center justify-center'>
        <Image src={TeemoFading} className='rounded-full border-[10px] border-steam-secondary bg-steam-primary' height={150}/>
        <Spinner size='lg' variant='wave' color='default' classNames={{label: "text-white text-2xl"}}/>
      </div>
    </div>
  )
}
