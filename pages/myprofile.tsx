import React, { useState, useEffect } from "react";
import { GetServerSideProps } from 'next';
import cookie from 'cookie';

import axios from 'axios';
import { TextField, Button, Grid, Box, Alert, AlertColor } from '@mui/material';
import CenteredContainer from '../components/CenteredContainer';
import { useDispatch, useSelector } from 'react-redux';

axios.defaults.withCredentials = true;

import config from '../config';
require('dotenv').config();

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookies = cookie.parse(context.req.headers.cookie || '');
  const authCookie = cookies.token;

  if (!authCookie) {
    context.res.setHeader('location', '/login');
    context.res.statusCode = 302;
    context.res.end();
    return { props: {} };
  }

  return { props: { /* your props here */ } };
};

const MyProfile = (props) => {
    const dispatch = useDispatch();

    const user = useSelector(state => state.user);
    const [email, setEmail] = useState(user.email);
    const [name, setName] = useState(user.name);

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState<AlertColor>("error")

    useEffect(() => {
        setEmail(user.email);
        setName(user.name);
    }, [user]);
    
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      const userData = {
          email: email,
          name: name,
      };

      try {
        const response = await axios.patch(process.env.NEXT_PUBLIC_BASE_API_URL + "/api/user", userData);
        if (response.status == 200) {
            setAlertMessage("User successfully editted.");
            setAlertType("success");
            setShowAlert(true);
            dispatch({ type: 'UPDATE_USER_INFO',  payload: { name: name, email: email},});
            setTimeout(handleClose, config.ALERT_TIMEOUT);
        }
      } catch (error) {
            console.log(error)
            setAlertMessage("Error editting user.");
            setAlertType("error");
            setShowAlert(true);
            setTimeout(handleClose, config.ALERT_TIMEOUT);
      }
  };
  
  const handleClose = () => {
    setShowAlert(false);
  }
  
  return (
    <CenteredContainer maxWidth="sm" handleSubmit={handleSubmit}>
      <Grid item xs={12}>
        <Box textAlign="center">
          <h2>Edit User</h2>
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
        <TextField id="outlined-basic" label="Name" variant="outlined" fullWidth type="name" value={name} autoFocus onChange={(e) => setName(e.target.value)}/>
      </Grid>
      <Grid item xs={12}>
        <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      </Grid>
      <Grid item xs={12}>
        <Box textAlign="center">
          <Button variant="contained" type="submit">Edit User</Button>
        </Box>
      </Grid>
    </CenteredContainer>
  );
};

export default MyProfile;