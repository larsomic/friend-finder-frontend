import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Typography,
  Button,
  Grid,
  Box,
  Alert,
  AlertColor,
  FormControlLabel,
  Switch
} from '@mui/material';

axios.defaults.withCredentials = true;

interface SettingsFormProps {
  onSubmit: () => void;
}

const SettingsForm: React.FC<SettingsFormProps> = ({ onSubmit }: SettingsFormProps) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<AlertColor>('error');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const fetchUserSettings = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_BASE_API_URL + '/api/user/settings');
        const userSettings = response.data;
        setDarkMode(userSettings.darkMode || false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userSettings = {
        darkMode: darkMode
    };

    try {
      const response = await axios.patch(process.env.NEXT_PUBLIC_BASE_API_URL + '/api/user/settings', userSettings);
      if (response.status === 200) {
        onSubmit();
      }
      // Show success alert or perform any other actions upon successful save
    } catch (error) {
      console.log(error);
      // Show error alert or handle the error in any desired way
    }
  };

  const handleClose = () => {
    setShowAlert(false);
  };

  const handleDarkModeToggle = ()=>{
    setDarkMode(!darkMode)
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs={12}>
          <Box textAlign="center">
            <Typography>Edit Settings</Typography>
          </Box>
        </Grid>
        {showAlert && (
          <Grid item xs={12}>
            <Alert severity={alertType} onClose={handleClose}>
              {alertMessage}
            </Alert>
          </Grid>
        )}
        <Grid item xs={12}>
            <FormControlLabel control={<Switch checked={darkMode} onChange={handleDarkModeToggle}/>} label="Dark Mode" labelPlacement="start"/>
        </Grid>
        <Grid item xs={12}>
          <Box textAlign="center">
            <Button variant="contained" type="submit">
              Save
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default SettingsForm;
