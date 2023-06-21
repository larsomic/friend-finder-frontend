import React, { useContext } from 'react';
import LoginForm from './LoginForm';
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../redux/store_type';
import { PopupContext } from '../contexts/PopupContext';

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