import React from 'react';
import FriendPreferencesForm from '../forms/FriendPreferencesForm';

interface FriendPreferencesPopupContentProps {
  closePopup: () => void;
}

const FriendPreferencesPopupContent: React.FC = ({ closePopup }: FriendPreferencesPopupContentProps) => {
  return (
    <div>
      <FriendPreferencesForm onSubmit={closePopup}/>
    </div>
  );
};

export default FriendPreferencesPopupContent;
