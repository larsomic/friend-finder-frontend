import BottomInfoBar from './BottomInfoBar'
import HeaderBar from './HeaderBar'

const AuthenticatedHomePage = () => {
  return (
    <div>
      <HeaderBar/>
      You are logged in.
      <BottomInfoBar/>
    </div>
  );
};

export default AuthenticatedHomePage;
