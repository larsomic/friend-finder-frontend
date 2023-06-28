import UserAccountForm from '../forms/UserAccountForm';
import { useSelector } from 'react-redux';
import { StoreType } from '../../redux/store_type';

interface AccountPopupContentProps {
  closePopup: () => void;
}

const AccountPopupContent = ({ closePopup }: AccountPopupContentProps) => {
  const user = useSelector((state: StoreType) => state.user);
  const { name = '', email='' } = user;
  const currentName = name === null ? '' : name;
  const currentEmail = email === null ? '' : email;
  
  return (
    <div>
      <UserAccountForm currentName={currentName} currentEmail={currentEmail} onSubmit={closePopup}/>
    </div>
  );
};

export default AccountPopupContent;