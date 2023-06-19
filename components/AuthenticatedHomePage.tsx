import BottomInfoBar from './BottomInfoBar'
import HeaderBar from './HeaderBar'
import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { StoreType } from '../redux/store_type';

const AuthenticatedHomePage = () => {
  const dispatch = useDispatch();

  const user = useSelector((state: StoreType) => state.user);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  
  
  return (
    <div>
      <HeaderBar/>
      <div>Hey {name}, lets get you some friends.</div>
      <BottomInfoBar/>
    </div>
  );
};

export default AuthenticatedHomePage;
