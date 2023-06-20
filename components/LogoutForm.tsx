import React, { useState } from "react";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { TextField, Button, Grid, Box, Alert, AlertColor } from '@mui/material';
import config from '../config';

axios.defaults.withCredentials = true;

interface LoginFormProps {
  onLogin: () => void;
}
  
const LoginForm = ({ onLogin }: LoginFormProps) => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<AlertColor>("error");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await axios.get(process.env.NEXT_PUBLIC_BASE_API_URL + '/api/auth/logout', { withCredentials: true });  
        dispatch({ type: 'LOG_OUT' });
      } catch (error) {
        console.error("An error occurred while logging out.", error);
      }
  };

  const handleClose = () => {
    setShowAlert(false);
  }

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

export default LoginForm;
