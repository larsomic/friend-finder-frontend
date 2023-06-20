import LogoutForm from './LogoutForm';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../redux/store_type';

const LogoutPopupContent = () => {
  return (
    <div>
      <LogoutForm/>
    </div>
  );
};

export default LogoutPopupContent;