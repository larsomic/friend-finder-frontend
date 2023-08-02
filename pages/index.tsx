/* eslint-disable @next/next/no-page-custom-font */
import { useSelector } from 'react-redux';
import type { StoreType } from '../redux/store_type';

import AuthenticatedHomePage from '../components/AuthenticatedHomePage';
import UnauthenticatedHomePage from '../components/UnauthenticatedHomePage';


const HomePage = () => {
  const loggedIn = useSelector((state: StoreType) => state.auth.loggedIn);
  return (
    <div>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
      <link href="https://fonts.googleapis.com/css2?family=Lora&family=Montserrat:wght@500&display=swap" rel="stylesheet"/>
      {loggedIn ? ( 
        <AuthenticatedHomePage/>
      ) : (
        <UnauthenticatedHomePage/>
      )}
    </div>
  );
};

export default HomePage;
