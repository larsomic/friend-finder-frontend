import React, { useState } from "react";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Button, Grid, AlertColor } from '@mui/material';
import { persistor } from '../../redux/store';

axios.defaults.withCredentials = true;

interface LogoutFormProps {
  setShowAlert: (param: boolean) => void; 
  setAlertMessage: (param: string) => void; 
  setAlertType: (param: AlertColor) => void;
  showAlert: boolean;
}

const areEqual = (prevProps: LogoutFormProps, nextProps: LogoutFormProps) => {
  return prevProps.showAlert === nextProps.showAlert;
};

const LogoutForm = React.memo(({ setShowAlert, setAlertMessage, setAlertType, showAlert }: LogoutFormProps) => {
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await axios.get(process.env.NEXT_PUBLIC_BASE_API_URL + '/api/auth/logout', { withCredentials: true });  
        if (response.status === 200) {
          dispatch({ type: 'RESET_STORE' });
          persistor.purge();
          setAlertMessage("User successfully logged out.");
          setAlertType("success");
          setShowAlert(true);
        }
      } catch (error) {
        console.error("An error occurred while logging out.", error);
        setAlertMessage("Error logging out.");
        setAlertType("error");
        setShowAlert(true);
      }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs={12}>
          <Button type="submit">Logout</Button>
        </Grid>
      </Grid>
    </form>
  );
}, areEqual);

LogoutForm.displayName = 'LogoutForm';

export default LogoutForm;
