import { useEffect, useState } from 'react'
import { type PreferenceApiResponse, type Game, type GameApiResponse, type Filters } from '../types/api'
import GameCard from './GameCard'
import TinderCard from 'react-tinder-card'
import { fetchApi } from '../utils/fetchApi'
import TeemoSpinner from './TeemoSpinner'
import { patchApi } from '../utils/patchApi'
import { Alert } from '@heroui/react'

interface Props {
  id: string
  filters: Filters
}

export default function GameCarousel({id, filters}: Props) {
  const [likes, setLikes] = useState<number[]>([])
  const [dislikes, setDislikes] = useState<number[]>([])
  const [games, setGames] = useState<Game[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>()
  const [needGames, setNeedGames] = useState<boolean>(true)
  
  const swiped = (direction: "left" | "right" | "up" | "down", appid: number) => {
    if (direction === "right") {
      setLikes([...likes, appid])
    } else if (direction === "left") {
      setDislikes([...dislikes, appid])
    }
    const temp = games.filter((game: Game) => game.AppId != appid)
    if (temp.length === 0) {
      setNeedGames(true)
    } else {
      setGames(temp)
    }
  }

  const IMAGE_LOAD_DELAY = 3000
  
  useEffect(() => {
    setGames([])
    setNeedGames(true);
  }, [filters]);

  useEffect(() => {
    const getQueryString = (filters: Filters)=> {
        const params = new URLSearchParams();
        
        params.append('limit', filters.limit.toString());
        
        if (filters.min_price >= 0) {
          params.append('min_price', filters.min_price.toString());
        }
        
        if (filters.max_price >= 0) {
          params.append('max_price', filters.max_price.toString());
        }
        
        if (filters.release_date.length > 0) {
          params.append('release_date', filters.release_date);
          params.append('before', filters.before.toString());
        }
        
        if (filters.tags.length > 0) {
          params.append('tags', filters.tags.join(','));
        }
        
        if (filters.genres.length > 0) {
          params.append('genres', filters.genres.join(','));
        }
        
        if (filters.platforms.length > 0) {
          params.append('platforms', filters.platforms.join(','));
        }
        
        return params.toString();
    }
    const fetchData = async () => {
      setError(undefined)
      setLoading(true)
      setNeedGames(false)
      const {error: error_patch} = await patchApi<PreferenceApiResponse>('/users/preferences', {id, likes, dislikes})
      if (error_patch) {
        console.log(error_patch)
      } else {
        setLikes([])
        setDislikes([])
      }

      const RANDOM_PROBABILITY = 0.2
      const endpoint = Math.random() < RANDOM_PROBABILITY
                       ? "/games/random?"
                       : `/games/recommend?id=${id}&`
      const {data: gameResponse, error: error_fetch} = await fetchApi<GameApiResponse>(endpoint.concat(getQueryString(filters)))
      if (error_fetch) {
        setError(error_fetch)
      } else if (gameResponse?.games && gameResponse.games.length > 0) {
        setGames(gameResponse.games)
        // Wait for images to load
        await new Promise(resolve => setTimeout(resolve, IMAGE_LOAD_DELAY));
      } else {
        setError("No games found with current filters!")
      }
      setLoading(false)
    }
    if (needGames) {
      fetchData()
    }
  }, [needGames, filters])

  return (
    <div className='flex items-center justify-center relative h-dvh overflow-hidden'>
      {loading && <TeemoSpinner/>}
      {error && <div className='w-fit'><Alert color="danger" title={error}/></div>}
      {games && games.map((game: Game) =>
        <TinderCard className={`absolute swipe ${loading ? 'opacity-0' : 'opacity-100'} `} preventSwipe={['up', 'down']} key={game.AppId} onSwipe={(dir) => swiped(dir, game.AppId)}>
            <GameCard game={game} key={game.AppId}/>
        </TinderCard>
      )}
    </div>
  )
}