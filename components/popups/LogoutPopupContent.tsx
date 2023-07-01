import LogoutForm from '../forms/LogoutForm';
import { AlertColor } from '@mui/material';

interface LogoutPopupContentProps {
  closePopup: () => void;
  setShowAlert: (param: boolean) => void; 
  setAlertMessage: (param: string) => void; 
  setAlertType: (param: AlertColor) => void;
}

const LogoutPopupContent = ({ closePopup, setShowAlert, setAlertMessage, setAlertType }: LogoutPopupContentProps) => {
  return (
    <div>
      <LogoutForm onSubmit={closePopup} setShowAlert={setShowAlert} setAlertMessage={setAlertMessage} setAlertType={setAlertType}/>
    </div>
  );
};

export default LogoutPopupContent;