import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {
  Typography,
  Button,
  Grid,
  Box,
  Alert,
  AlertColor,
  ToggleButton,
  ToggleButtonGroup,
  Slider,
  Input,
} from '@mui/material';
import MultiSelectCheckmarks from '../MultiSelectCheckmarks';
import { attractedToOptions, religionOptions } from '../../options';

axios.defaults.withCredentials = true;

interface FriendPreferencesFormProps {
  onSubmit: () => void;
}

const FriendPreferencesForm: React.FC<FriendPreferencesFormProps> = ({ onSubmit }: FriendPreferencesFormProps) => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertType, setAlertType] = useState<AlertColor>('error');
  const [inPersonPreference, setInPersonPreference] = useState('inperson');
  const [miles, setMiles] = useState<number | string | Array<number | string>>(30);
  const [attractedTo, setAttractedTo] = useState<string[]>([]);
  const [religion, setReligion] = useState<string[]>([]);

  useEffect(() => {
    const fetchUserPreferences = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_BASE_API_URL + '/api/user/friendpreferences');
        const userPreferences = response.data;
        setInPersonPreference(userPreferences.inPersonPreference || 'inperson');
        setMiles(userPreferences.miles || 30);
        setAttractedTo(userPreferences.attractedTo || []);
        setReligion(userPreferences.religion || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserPreferences();
  }, []);

  const handleAlignmentChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string | null
  ) => {
    if (newAlignment !== null) {
      setInPersonPreference(newAlignment);
    }
  };

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    setMiles(newValue);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMiles(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (typeof miles === 'number') {
      if (miles < 1) {
        setMiles(1);
      } else if (miles > 100) {
        setMiles(100);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userPreferences = {
      inPersonPreference,
      miles,
      attractedTo,
      religion,
    };

    try {
      const response = await axios.patch(process.env.NEXT_PUBLIC_BASE_API_URL + '/api/user/userfriendpreferences', userPreferences);
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

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  return (
    <form onSubmit={handleSubmit}>
      <Grid container direction="column" spacing={2}>
        <Grid item xs={12}>
          <Box textAlign="center">
            <Typography>Edit Preferences</Typography>
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
          <ToggleButtonGroup
            color="primary"
            value={inPersonPreference}
            exclusive
            onChange={handleAlignmentChange}
            aria-label="Platform"
          >
            <ToggleButton value="inperson">In Person</ToggleButton>
            <ToggleButton value="remote">Remote</ToggleButton>
          </ToggleButtonGroup>
        </Grid>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <Slider
              value={typeof miles === 'number' ? miles : 1}
              onChange={handleSliderChange}
              aria-labelledby="input-slider"
            />
          </Grid>
          <Grid item>
            <Input
              value={miles}
              size="small"
              onChange={handleInputChange}
              onBlur={handleBlur}
              inputProps={{
                step: 10,
                min: 1,
                max: 100,
                type: 'number',
                'aria-labelledby': 'input-slider',
              }}
            />
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <MultiSelectCheckmarks
            label="I'm interested in"
            options={attractedToOptions}
            value={attractedTo}
            onChange={(value: string[] | string) => setAttractedTo(value as string[])}
          />
        </Grid>
        <Grid item xs={12}>
          <MultiSelectCheckmarks
            label="Religion"
            options={religionOptions}
            value={religion}
            onChange={(value: string[] | string) => setReligion(value as string[])}
          />
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

export default FriendPreferencesForm;
