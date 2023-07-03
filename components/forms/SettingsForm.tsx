import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Typography, Button, Grid, Box, Alert, AlertColor, FormControlLabel, Switch } from '@mui/material';
import { useDispatch } from 'react-redux';
import { handleDarkMode, handleColorTheme } from '../../util/handleTheme';
import { setUserSettings } from '../../redux/userReducer';
import ColorPalette from '../ColorPalette';

axios.defaults.withCredentials = true;

interface SettingsFormProps {
  onSubmit: () => void;
  onSuccess: () => void;
  setShowAlert: (param: boolean) => void; 
  setAlertMessage: (param: string) => void; 
  setAlertType: (param: AlertColor) => void;
}

const SettingsForm: React.FC<SettingsFormProps> = ({onSuccess, onSubmit, setShowAlert, setAlertMessage, setAlertType}) => {
  const dispatch = useDispatch();
  
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [selectedColor, setSelectedColor] = useState<string>('Blue');

  useEffect(() => {
    const fetchUserSettings = async () => {
      try {
        const response = await axios.get(
          process.env.NEXT_PUBLIC_BASE_API_URL + '/api/user/settings'
        );
        const userSettings = response.data;
        if (response.status == 200) {
          dispatch(setUserSettings(userSettings.darkMode, userSettings.selectedColor));
          setDarkMode(userSettings.darkMode);
          setSelectedColor(userSettings.selectedColor);
          handleColorTheme(userSettings.selectedColor);
          handleDarkMode(userSettings.darkMode);
          setAlertMessage("Successfully changed user settings.");
          setAlertType("success");
          setShowAlert(true);
        }
      } catch (error) {
        setAlertMessage("Error changing user settings.");
        setAlertType("error");
        setShowAlert(true);
        console.log(error);
      }
    };

    fetchUserSettings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userSettings = {
      darkMode: darkMode,
      selectedColor: selectedColor,
    };

    try {
      const response = await axios.patch(process.env.NEXT_PUBLIC_BASE_API_URL + '/api/user/settings', userSettings);
      if (response.status === 200) {
        onSuccess();
        dispatch(setUserSettings(darkMode, selectedColor));
        handleColorTheme(selectedColor);
        handleDarkMode(darkMode);
        setAlertMessage("Succesfully set user settings.");
        setAlertType("success");
        setShowAlert(true);
        onSubmit();
      }
    } catch (error) {
      console.log(error);
      setAlertMessage("Error setting user settings.");
      setAlertType("error");
      setShowAlert(true);
    }
  };

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs={12}>
          <Box textAlign="center">
            <Typography>Edit Settings</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={handleDarkModeToggle}
              />
            }
            label="Dark Mode"
            labelPlacement="start"
          />
        </Grid>
        <Grid item xs={12}>
          <ColorPalette onColorSelect={setSelectedColor} selectedColor={selectedColor}/>
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
