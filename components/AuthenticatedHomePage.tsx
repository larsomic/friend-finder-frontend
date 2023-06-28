import BottomInfoBar from './BottomInfoBar'
import HeaderBar from './HeaderBar'
import Popup from '../contexts/Popup'
import React, { useState, useEffect } from "react";
import { useSelector } from 'react-redux';
import { StoreType } from '../redux/store_type';
import MatchesViewer from './MatchesViewer';

const AuthenticatedHomePage = () => {
  const user = useSelector((state: StoreType) => state.user);
  const [name, setName] = useState(user.name);

  useEffect(() => {
    setName(user.name);   
  }, [user]);

  return (
    <div>
      <HeaderBar />
      <Popup />
      <div>Hey {name}, lets get you some friends.</div>
      {/* <MatchesViewer/> */}
      <BottomInfoBar />
    </div>
  );
};

export default AuthenticatedHomePage;
