import GameCard from './GameCard'
import TinderCard from 'react-tinder-card'

export default function GameCarousel() { 
  const games: number[] = [1, 2, 3, 4, 5] 
  return (
    <div className='flex items-center justify-center relative h-dvh overflow-hidden'>
      {games.map((game: number) =>
        <TinderCard className='absolute swipe' preventSwipe={['up', 'down']} key={game}>
            <GameCard/>
        </TinderCard>
      )}
    </div>
  )
}