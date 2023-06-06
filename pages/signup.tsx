import React, { useState } from "react";
import axios from 'axios';
import { TextField, Button, Grid, Box, Alert, AlertColor } from '@mui/material';
import CenteredContainer from '../components/CenteredContainer';
import { useDispatch } from 'react-redux';
axios.defaults.withCredentials = true;

import config from '../config';
require('dotenv').config();

const Signup = () => {
  const dispatch = useDispatch(); 
  var [name, setName] = useState("");
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  var [showAlert, setShowAlert] = useState(false);
  var [alertMessage, setAlertMessage] = useState("");
  var [alertType, setAlertType] = useState<AlertColor>("error")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = {
        name: name,
        email: email,
        password: password,
      };
    try {
        const response = await axios.post(process.env.NEXT_PUBLIC_BASE_API_URL+"/api/auth/signup", userData);
        if (response.status == 200) {
            setAlertMessage("User succesfuly created.")
            setAlertType("success")
            dispatch({ type: 'SIGNED_UP' });
        }
      } catch (error) {
            setAlertMessage("Error when creating user.")
            setAlertType("error")
      }
      setShowAlert(true);
      setTimeout(handleClose, config.ALERT_TIMEOUT);
  };

  const handleClose = () => {
    setShowAlert(false);
  }

  return (
    <CenteredContainer maxWidth="sm" handleSubmit={handleSubmit}>
      <Grid item xs={12}>
        <Box textAlign="center">
          <h2>Sign Up</h2>
        </Box>
      </Grid>
      {showAlert && 
            <Grid item xs={12}>
                <Alert severity={alertType} onClose={handleClose}>
                    {alertMessage}
                </Alert>
            </Grid>
        }
      <Grid item xs={12}>
        <TextField id="outlined-basic" label="Name" variant="outlined" fullWidth type="text" value={name} autoFocus onChange={(e) => setName(e.target.value)}/>
      </Grid>
      <Grid item xs={12}>
        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      </Grid>
      <Grid item xs={12}>
        <TextField id="outlined-basic" label="Password" variant="outlined" fullWidth type="password" value={password} autoComplete='new-password' onChange={(e) => setPassword(e.target.value)}/>
      </Grid>
      <Grid item xs={12}>
        <Box textAlign="center">
          <Button variant="contained" type="submit">Sign Up</Button>
        </Box>
      </Grid>
    </CenteredContainer>
  );
};

export default Signup;
