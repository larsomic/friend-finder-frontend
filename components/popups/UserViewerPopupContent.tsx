import React, {useEffect, useState} from 'react';
import { AlertColor } from '@mui/material';
import axios from 'axios';

interface UserViewerPopupContextProps {
  closePopup: () => void;
  setShowAlert: (param: boolean) => void; 
  setAlertMessage: (param: string) => void; 
  setAlertType: (param: AlertColor) => void;
  userToken: string;
}

const UserViewerPopupContent = ({ closePopup,  setShowAlert, setAlertMessage, setAlertType, userToken }: UserViewerPopupContextProps) => {
  const [user, setUser] = useState<any | null>(null);

  useEffect(() => {
    const fetchShortlist = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_BASE_API_URL + '/api/shortlist/user', {
          params: {
              userToken: userToken
          }
      });
      console.log(response)
      if (response.data.userRequestedData){
        setUser(response.data.userRequestedData)
      }
      } catch (error) {
        console.log(error);
      }
    };

    fetchShortlist();
  }, []);

  return (
    <div>
      {user ? (
        <>
          <div>{user.name}</div>
          <div>{user.email}</div>
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default UserViewerPopupContent;
