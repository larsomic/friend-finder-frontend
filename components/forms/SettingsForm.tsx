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
import { useDispatch } from 'react-redux';
import handleDarkMode from '../../util/handleDarkMode'
import { setUserSettings } from '../../redux/userReducer';


axios.defaults.withCredentials = true;

interface SettingsFormProps {
  onSuccess: () => void;
}

const SettingsForm: React.FC<SettingsFormProps> = ({onSuccess}) => {
  const dispatch = useDispatch();

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<AlertColor>('error');
  const [darkMode, setDarkMode] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserSettings = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_BASE_API_URL + '/api/user/settings');
        const userSettings = response.data;
        if (response.status == 200) {
          dispatch(setUserSettings(userSettings.darkMode));
          setDarkMode(userSettings.darkMode)
        }
        handleDarkMode(userSettings.darkMode)

      } catch (error) {
        console.log(error);
      }
    };

    fetchUserSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userSettings = {
        darkMode: darkMode
    };

    try {
      await axios.patch(process.env.NEXT_PUBLIC_BASE_API_URL + '/api/user/settings', userSettings);
      onSuccess()
      dispatch(setUserSettings(darkMode));
      handleDarkMode(darkMode)
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
