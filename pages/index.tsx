import { useSelector } from 'react-redux';
import type { StoreType } from '../redux/store_type';

const HomePage = () => {
<<<<<<< HEAD
  const loggedIn = useSelector((state: StoreType) => state.auth.loggedIn);
=======
  const loggedIn = useSelector((state: StoreType) => state.loggedIn);
>>>>>>> a860dfd059d8dd22f2a535227fa29745b01a95bf
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
