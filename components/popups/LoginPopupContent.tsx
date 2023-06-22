import React, { useContext } from 'react';
import LoginForm from '../forms/LoginForm';
import { PopupContext } from '../../contexts/PopupContext';

const LoginPopupContent = () => {
    const popupContext = useContext(PopupContext);
  
    const handleLogin = () => {
      popupContext?.closePopup();
    };

  return (
    <div>
      <LoginForm onLogin={handleLogin}/>
    </div>
  );
};

export default LoginPopupContent;