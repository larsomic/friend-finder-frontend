import React, { useState } from "react";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { TextField, Button, Grid, Box, Alert, AlertColor } from '@mui/material';
import config from '../../config';

axios.defaults.withCredentials = true;

interface SignupFormProps {
    onSignup: () => void;
  }
    
const SignupForm = ({ onSignup }: SignupFormProps) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState<AlertColor>("error");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userData = {
        name,
        email,
        password,
    };

    try {
        const response = await axios.post(process.env.NEXT_PUBLIC_BASE_API_URL + "/api/auth/signup", userData);
        if (response.status == 200) {
            setAlertMessage("User successfully created.");
            setAlertType("success");
            setShowAlert(true);
            dispatch({ type: 'SIGNED_UP' });
            setTimeout(handleClose, config.ALERT_TIMEOUT);
            onSignup();
        }
    } catch (error) {
        setAlertMessage("Error when creating user.");
        setAlertType("error");
        setShowAlert(true);
        setTimeout(handleClose, config.ALERT_TIMEOUT);
    }
  };

  const handleClose = () => {
    setShowAlert(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="column" spacing={2}>
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
      </Grid>
    </form>
  );
};

export default SignupForm;
