import UserProfileForm from '../forms/UserProfileForm';
import { useSelector } from 'react-redux';
import { StoreType } from '../../redux/store_type';

const ProfilePopupContent = () => {
  const user = useSelector((state: StoreType) => state.user);
  const { name = '', email='' } = user;
  const currentName = name === null ? '' : name;
  const currentEmail = email === null ? '' : email;
  
  return (
    <div>
      <UserProfileForm currentName={currentName} currentEmail={currentEmail}/>
    </div>
  );
};

export default ProfilePopupContent;