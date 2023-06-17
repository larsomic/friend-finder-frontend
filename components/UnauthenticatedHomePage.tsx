import BottomInfoBar from './BottomInfoBar'
import HeaderBar from './HeaderBar'

const UnauthenticatedHomePage = () => {
  
  return (
    <div>
      <HeaderBar/>
      You are not logged in.
      <BottomInfoBar/>
    </div>
  );
};

export default UnauthenticatedHomePage;
