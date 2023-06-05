import { useSelector } from 'react-redux';

const HomePage = () => {
  const loggedIn = useSelector((state) => state.user.loggedIn);
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
