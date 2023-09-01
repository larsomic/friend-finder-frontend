import React from 'react';
import FriendPreferencesForm from '../forms/FriendPreferencesForm';
import { AlertColor } from '@mui/material';
import { useSelector } from 'react-redux';
import { StoreType } from '../../redux/store_type';

interface FriendPreferencesPopupContentProps {
  closePopup: () => void;
  setShowAlert: (param: boolean) => void; 
  setAlertMessage: (param: string) => void; 
  setAlertType: (param: AlertColor) => void;
}

const FriendPreferencesPopupContent = ({ closePopup, setShowAlert, setAlertMessage, setAlertType }: FriendPreferencesPopupContentProps) => {
  const user = useSelector((state: StoreType) => state.user);
  const { name = '', email='', isDemoUser = false } = user;

  return (
    <div>
      <FriendPreferencesForm onSubmit={closePopup} setShowAlert={setShowAlert} setAlertMessage={setAlertMessage} setAlertType={setAlertType} isDemoUser={isDemoUser}/>
    </div>
  );
};

export default FriendPreferencesPopupContent;
