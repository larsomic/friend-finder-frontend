import React from 'react';
import SettingsForm from '../forms/SettingsForm';
import { AlertColor } from '@mui/material';

interface SettingsPopupContextProps {
  closePopup: () => void;
  setShowAlert: (param: boolean) => void; 
  setAlertMessage: (param: string) => void; 
  setAlertType: (param: AlertColor) => void;
}

const SettingsPopupContent = ({ closePopup,  setShowAlert, setAlertMessage, setAlertType }: SettingsPopupContextProps) => {
  const onSuccess = () => {}

  return (
    <div>
      <SettingsForm onSuccess={onSuccess} onSubmit={closePopup} setShowAlert={setShowAlert} setAlertMessage={setAlertMessage} setAlertType={setAlertType}/>
    </div>
  );
};

export default SettingsPopupContent;
