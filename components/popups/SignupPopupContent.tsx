import SignupForm from '../forms/SignupForm';
import React, { useContext } from 'react';
import { PopupContext } from '../../contexts/PopupContext';

const SignupPopupContent = () => {
  const popupContext = useContext(PopupContext);
  
  const handleSignup = () => {
    popupContext?.closePopup();
  };

  return (
    <div>
      <SignupForm onSignup={handleSignup}/>
    </div>
  );
};

export default SignupPopupContent;