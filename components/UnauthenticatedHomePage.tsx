import BottomInfoBar from './BottomInfoBar'
import HeaderBar from './HeaderBar'
import Popup from '../contexts/Popup'

const UnauthenticatedHomePage = () => {
  
  return (
    <div>
      <HeaderBar/>
      <Popup />
      <BottomInfoBar/>
    </div>
  );
};

export default UnauthenticatedHomePage;
