import BottomInfoBar from './BottomInfoBar'
import HeaderBar from './HeaderBar'
import Popup from '../contexts/Popup'
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../redux/store_type';

const AuthenticatedHomePage = () => {
  const dispatch = useDispatch();

  const user = useSelector((state: StoreType) => state.user);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [isPopupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);
  }, [user]);
  
  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div>
      <HeaderBar/>
      <Popup />
      <div>Hey {name}, lets get you some friends.</div>
      <BottomInfoBar/>
    </div>
  );
};

export default AuthenticatedHomePage;
