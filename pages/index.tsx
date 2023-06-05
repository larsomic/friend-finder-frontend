import { useSelector } from 'react-redux';
import type { StoreType } from '../redux/store_type';

const HomePage = () => {
  const loggedIn = useSelector((state: StoreType) => state.loggedIn);
  return (
    <div>
      {loggedIn ? (
        <h1>Welcome, you are logged in!</h1>
      ) : (
        <h1>Please log in.</h1>
      )}
    </div>
  );
};

export default HomePage;
