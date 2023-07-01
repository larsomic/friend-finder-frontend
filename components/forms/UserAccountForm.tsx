import React, { useState } from "react";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { TextField, Button, Grid, Box, AlertColor } from '@mui/material';

interface UserAccountFormProps {
  currentName: string;
  currentEmail: string;
  onSubmit: () => void;
  setShowAlert: (param: boolean) => void; 
  setAlertMessage: (param: string) => void; 
  setAlertType: (param: AlertColor) => void;
}

const UserAccountForm = ({ currentName, currentEmail, onSubmit, setShowAlert, setAlertMessage, setAlertType }: UserAccountFormProps) => {
  const dispatch = useDispatch();
  const [name, setName] = useState(currentName);
  const [email, setEmail] = useState(currentEmail);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userData = {
        email,
        name,
    };

    try {
      const response = await axios.patch(process.env.NEXT_PUBLIC_BASE_API_URL + "/api/user", userData);
      if (response.status === 200) {
        setAlertMessage("User successfully edited.");
        setAlertType("success");
        setShowAlert(true);
        dispatch({ type: 'UPDATE_USER_INFO', payload: { name, email } });
        onSubmit();
      }
    } catch (error) {
      console.log(error);
      setAlertMessage("Error editing user.");
      setAlertType("error");
      setShowAlert(true);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs={12}>
          <Box textAlign="center">
            <h2>Edit Account</h2>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            type="name"
            value={name}
            autoFocus
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item xs={12}>
          <Box textAlign="center">
            <Button variant="contained" type="submit">
              Edit Account
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default UserAccountForm;

