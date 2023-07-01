import React, { useState } from "react";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { Button, Grid, AlertColor } from '@mui/material';
import { persistor } from '../../redux/store';


axios.defaults.withCredentials = true;

interface LogoutFormProps {
  onSubmit: () => void;
  setShowAlert: (param: boolean) => void; 
  setAlertMessage: (param: string) => void; 
  setAlertType: (param: AlertColor) => void;
}

const LogoutForm = ({ onSubmit, setShowAlert, setAlertMessage, setAlertType }: LogoutFormProps) => {
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await axios.get(process.env.NEXT_PUBLIC_BASE_API_URL + '/api/auth/logout', { withCredentials: true });  
        if (response.status === 200) {
          setAlertMessage("User successfully logged out.");
          setAlertType("success");
          setShowAlert(true);
          dispatch({ type: 'RESET_STORE' });
          persistor.purge();
          onSubmit();
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
};

export default LogoutForm;
