import LogoutForm from '../forms/LogoutForm';
import { AlertColor } from '@mui/material';

interface LogoutPopupContentProps {
  setShowAlert: (param: boolean) => void; 
  setAlertMessage: (param: string) => void; 
  setAlertType: (param: AlertColor) => void;
  showAlert: boolean;
}

const LogoutPopupContent = ({ setShowAlert, setAlertMessage, setAlertType, showAlert }: LogoutPopupContentProps) => {
  return (
    <div>
      <LogoutForm setShowAlert={setShowAlert} setAlertMessage={setAlertMessage} setAlertType={setAlertType} showAlert={showAlert}/>
    </div>
  );
};

export default LogoutPopupContent;