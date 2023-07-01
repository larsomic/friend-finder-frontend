import React from 'react';
import FriendPreferencesForm from '../forms/FriendPreferencesForm';
import { AlertColor } from '@mui/material';

interface FriendPreferencesPopupContentProps {
  closePopup: () => void;
  setShowAlert: (param: boolean) => void; 
  setAlertMessage: (param: string) => void; 
  setAlertType: (param: AlertColor) => void;
}

const FriendPreferencesPopupContent = ({ closePopup, setShowAlert, setAlertMessage, setAlertType }: FriendPreferencesPopupContentProps) => {
  return (
    <div>
      <FriendPreferencesForm onSubmit={closePopup} setShowAlert={setShowAlert} setAlertMessage={setAlertMessage} setAlertType={setAlertType}/>
    </div>
  );
};

export default FriendPreferencesPopupContent;
