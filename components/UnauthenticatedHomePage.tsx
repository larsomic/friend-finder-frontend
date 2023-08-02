import BottomInfoBar from './BottomInfoBar';
import HeaderBar from './HeaderBar';
import Popup from '../contexts/Popup';
import HomePicture from './HomePicture'

const UnauthenticatedHomePage = () => {
  return (
    <div className='UnauthenticatedHomePage'>
      <HeaderBar />
      <Popup />
      <HomePicture/>
      <BottomInfoBar/>
    </div>
  );
};

export default UnauthenticatedHomePage;
