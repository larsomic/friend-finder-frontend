import SignupForm from './SignupForm';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../redux/store_type';
import React, { useContext } from 'react';
import { PopupContext } from '../contexts/PopupContext';

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