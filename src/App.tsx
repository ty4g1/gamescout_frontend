import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { v4 as uuidv4 } from 'uuid';

import GameCarousel from './components/GameCarousel';
import Navbar from './components/Navbar';
import TeemoSpinner from './components/TeemoSpinner';

import backgroundImage from './assets/background.png'


export default function App() {
  const [cookies, setCookie] = useCookies(['userId']);

  useEffect(() => {
    if (!cookies.userId) {
      const newUserId = uuidv4();
      console.log('New userId:', newUserId);
      setCookie('userId', newUserId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365 * 2, // 2 years
        sameSite: 'lax'
      });
    }
  }, [cookies.userId, setCookie]);

  return (
    <div 
    className='relative min-h-screen'
    style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <Navbar/>
      <GameCarousel/>
    </div>
  );
}