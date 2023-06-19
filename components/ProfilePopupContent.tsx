import UserProfileForm from './UserProfileForm';
import { useDispatch, useSelector } from 'react-redux';

const ProfilePopupContent = () => {
  const user = useSelector((state: StoreType) => state.user);
  const { name, email } = user;
  
  return (
    <div>
      <UserProfileForm currentName={name} currentEmail={email}/>
    </div>
  );
};

export default ProfilePopupContent;