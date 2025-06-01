import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { v4 as uuidv4 } from 'uuid';
import GameCarousel from './components/GameCarousel';
import Navbar from './components/Navbar';
import TeemoSpinner from './components/TeemoSpinner';
import { postApi } from './utils/postApi';
import backgroundImage from './assets/background.png'
import { type Filters, type UserApiResponse } from './types/api';

export default function App() {
  const [cookies, setCookie] = useCookies(['userId']);
  const [isLoading, setIsLoading] = useState(true);
  
  const [filters, setFilters] = useState<Filters>({
    limit: 10,
    min_price: -1,
    max_price: -1,
    release_date: '',
    before: true,
    tags: [],
    genres: [],
    platforms: []
  });

  useEffect(() => {
    const initializeUser = async () => {
      if (!cookies.userId) {
        // Create new user
        const newUserId = uuidv4();
        setCookie('userId', newUserId, {
          path: '/',
          maxAge: 60 * 60 * 24 * 365 * 2, // 2 years
          sameSite: 'lax'
        });

        const {data: userResponse, error} = await postApi<UserApiResponse>('/users/add', {id: newUserId});
        if (error) {
          console.log(error);
        } else {
          console.log(userResponse?.user);
        }
      }

      setIsLoading(false);
    };

    initializeUser();
  }, []);

  if (isLoading) {
    return (
      <div
        className='relative min-h-screen'
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <TeemoSpinner/>
      </div>
    );
  }

  return (
    <div
      className='relative min-h-screen'
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Navbar filters={filters} setFilters={setFilters}/>
      <GameCarousel id={cookies.userId} filters={filters}/>
    </div>
  );
}