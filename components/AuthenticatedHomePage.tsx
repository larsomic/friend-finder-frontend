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
      <div id='a'>MIKEEEE</div>
      <div id='b'>MIKEEEE</div>
      <div id='c'>MIKEEEE</div>
      <div id='d'>MIKEEEE</div>
      <div id='e'>MIKEEEE</div>
      <div id='b'>MIKEEEE</div>
      <div id='c'>MIKEEEE</div>
      <div id='d'>MIKEEEE</div>
      <div id='e'>MIKEEEE</div>
      <div id='b'>MIKEEEE</div>
      <div id='c'>MIKEEEE</div>
      <div id='d'>MIKEEEE</div>
      <div id='e'>MIKEEEE</div>
      <div id='b'>MIKEEEE</div>
      <div id='c'>MIKEEEE</div>
      <div id='d'>MIKEEEE</div>
      <div id='e'>MIKEEEE</div>
      <div id='b'>MIKEEEE</div>
      <div id='c'>MIKEEEE</div>
      <div id='d'>MIKEEEE</div>
      <div id='e'>MIKEEEE</div>
      <div id='b'>MIKEEEE</div>
      <div id='c'>MIKEEEE</div>
      <div id='d'>MIKEEEE</div>
      <div id='e'>MIKEEEE</div>
      {/* <MatchesViewer/> */}
      <BottomInfoBar />
    </div>
  );
};

export default AuthenticatedHomePage;
