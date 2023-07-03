import React, { useContext } from 'react';
import LoginForm from '../forms/LoginForm';
import { PopupContext } from '../../contexts/PopupContext';
import { AlertColor } from '@mui/material';

interface LoginPopupContentProps {
  setShowAlert: (param: boolean) => void; 
  setAlertMessage: (param: string) => void; 
  setAlertType: (param: AlertColor) => void;
}

const LoginPopupContent = ({ setShowAlert, setAlertMessage, setAlertType }: LoginPopupContentProps) => {
    const popupContext = useContext(PopupContext);
  
    const handleLogin = () => {
      popupContext?.closePopup();
    };

  return (
    <div>
      <LoginForm onLogin={handleLogin} setShowAlert={setShowAlert} setAlertMessage={setAlertMessage} setAlertType={setAlertType}/>
    </div>
  );
};

export default LoginPopupContent;