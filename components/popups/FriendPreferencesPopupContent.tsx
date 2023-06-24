import React from 'react';
import { useSelector } from 'react-redux';
import { StoreType } from '../../redux/store_type';
import FriendPreferencesForm from '../forms/FriendPreferencesForm';

const FriendPreferencesPopupContent: React.FC = () => {
  const user = useSelector((state: StoreType) => state.user);
  const { name = '', email = '' } = user;
  const currentName = name === null ? '' : name;
  const currentEmail = email === null ? '' : email;

  return (
    <div>
      <FriendPreferencesForm currentName={currentName} currentEmail={currentEmail} />
    </div>
  );
};

export default FriendPreferencesPopupContent;
