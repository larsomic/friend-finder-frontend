import UserAccountForm from '../forms/UserAccountForm';
import { useSelector } from 'react-redux';
import { StoreType } from '../../redux/store_type';
import { AlertColor } from '@mui/material';

interface AccountPopupContentProps {
  setShowAlert: (param: boolean) => void; 
  setAlertMessage: (param: string) => void; 
  setAlertType: (param: AlertColor) => void;
  closePopupAndAlert: ()=> void;
}

const AccountPopupContent = ({ setShowAlert, setAlertMessage, setAlertType, closePopupAndAlert }: AccountPopupContentProps) => {
  const user = useSelector((state: StoreType) => state.user);
  const { name = '', email='' } = user;
  const currentName = name === null ? '' : name;
  const currentEmail = email === null ? '' : email;
  
  return (
    <div>
      <UserAccountForm currentName={currentName} currentEmail={currentEmail} setShowAlert={setShowAlert} setAlertMessage={setAlertMessage} setAlertType={setAlertType} closePopupAndAlert={closePopupAndAlert}/>
    </div>
  );
};

export default AccountPopupContent;