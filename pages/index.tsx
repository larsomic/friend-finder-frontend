import { useSelector } from 'react-redux';
import type { StoreType } from '../redux/store_type';

import AuthenticatedHomePage from '../components/AuthenticatedHomePage';
import UnauthenticatedHomePage from '../components/UnauthenticatedHomePage';


const HomePage = () => {
  const loggedIn = useSelector((state: StoreType) => state.auth.loggedIn);
  return (
    <div>
      {loggedIn ? ( 
        <AuthenticatedHomePage/>
      ) : (
        <UnauthenticatedHomePage/>
      )}
    </div>
  );
};

export default HomePage;
