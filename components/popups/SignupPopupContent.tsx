import SignupForm from '../forms/SignupForm';
import React, { useContext } from 'react';
import { PopupContext } from '../../contexts/PopupContext';
import { AlertColor } from '@mui/material';


interface SignUpPopupContentProps {
  setShowAlert: (param: boolean) => void; 
  setAlertMessage: (param: string) => void; 
  setAlertType: (param: AlertColor) => void;
  closePopupAndAlert: ()=> void;
}

const SignupPopupContent = ({ setShowAlert, setAlertMessage, setAlertType, closePopupAndAlert }:SignUpPopupContentProps) => {
  const popupContext = useContext(PopupContext);
  
  const handleSignup = () => {
    popupContext?.closePopup();
  };

  return (
    <div>
      <SignupForm onSignup={handleSignup} setShowAlert={setShowAlert} setAlertMessage={setAlertMessage} setAlertType={setAlertType} closePopupAndAlert={closePopupAndAlert}/>
    </div>
  );
};

export default SignupPopupContent;