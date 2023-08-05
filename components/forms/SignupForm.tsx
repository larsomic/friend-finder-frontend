import React, { useState, useEffect, useCallback } from "react";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { TextField, Button, Grid, Box, AlertColor, Alert, Typography, styled } from '@mui/material';
import config from '../../config';

axios.defaults.withCredentials = true;

const AlertStyled = styled(Alert)(({ theme }) => ({
  '& .MuiAlert-message': {
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.8rem',
      padding: '0',
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '1rem',
      padding: '0',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1.2rem',
      padding: '0',
    },
    display: 'flex',
    alignItems: 'center', 
  },
  '& .MuiAlert-icon': {
    [theme.breakpoints.down('xs')]: {
      fontSize: '0.8rem',
    },
    [theme.breakpoints.up('sm')]: {
      fontSize: '1rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1.2rem',
    },
    marginRight: '0.5rem', 
    paddingBottom: '0 !important',
  },
}));

interface SignupFormProps {
    onSignup: () => void;
    setShowAlert: (param: boolean) => void; 
    setAlertMessage: (param: string) => void; 
    setAlertType: (param: AlertColor) => void;
    closePopupAndAlert: () => void;
}

const SignupForm = ({ onSignup, setShowAlert, setAlertMessage, setAlertType, closePopupAndAlert }: SignupFormProps) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");

  const [passwordError, setPasswordError] = useState<string[]>([]);
  const [passwordAgainError, setPasswordAgainError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordError.length > 0 || passwordAgainError || emailError || !name || !email) {
      return;
    }

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
            setTimeout(closePopupAndAlert, config.ALERT_TIMEOUT);
            onSignup();
        }
    } catch (error) {
        setAlertMessage("Error when creating user.");
        setAlertType("error");
        setShowAlert(true);
        setTimeout(closePopupAndAlert, config.ALERT_TIMEOUT);
    }
  };

  const isValidEmail = (email: string) => {
    let emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

  const handleEmailChange = useCallback((emailPassed: string) => {
    setEmail(emailPassed);
    if (!isValidEmail(emailPassed)) {
      setEmailError("Please enter a valid email address.");
    } else {
      setEmailError("");
    }
  }, []);

  const handlePasswordError = useCallback((passwordPassed: string) => {
    // Regular expressions
    let lengthRegex = /^.{8,32}$/;
    let uppercaseRegex = /[A-Z]/;
    let lowercaseRegex = /[a-z]/;
    let specialCharRegex = /[~!@#$%^*()_+\-=\[\]{}|:;"<>,.?]/;
    let digitRegex = /\d/;
  
    let errorMessages = [];
  
    if (!passwordPassed.length) {
      errorMessages.push('Password is empty.');
    } 
    if (!lengthRegex.test(passwordPassed)) {
      errorMessages.push('Password should be between 8 and 32 characters.');
    } 
    if (!uppercaseRegex.test(passwordPassed)) {
      errorMessages.push('Password should contain at least one uppercase letter.');
    } 
    if (!lowercaseRegex.test(passwordPassed)) {
      errorMessages.push('Password should contain at least one lowercase letter.');
    } 
    if (!specialCharRegex.test(passwordPassed)) {
      errorMessages.push('Password should contain at least one special character.');
    } 
    if (!digitRegex.test(passwordPassed)) {
      errorMessages.push('Password should contain at least one digit.');
    } 
  
    // If there are any error messages, join them into one string. Otherwise, set password error to ''.
    if (errorMessages.length > 0) {
      setPasswordError(errorMessages);
    } else {
      setPasswordError([]);
    }
  }, []);

  const handlePasswordAgainError = useCallback((passwordPassed: String, passwordAgainPassed: String)=>{
    if (passwordPassed !== passwordAgainPassed){
      setPasswordAgainError("Passwords do not match.");
    }
    else {
      setPasswordAgainError("");
    }
  }, []);

  const handlePasswordChange = (passedPassword:string) => {
    setPassword(passedPassword);
    handlePasswordError(passedPassword)
    handlePasswordAgainError(passedPassword, passwordAgain)
  };

  const handlePasswordAgainChange = (passedPassword:string) => {
    setPasswordAgain(passedPassword);
    handlePasswordAgainError(password, passedPassword)
  };

  const handleNameChange = useCallback((passedName: string) => {
    setName(passedName);
    if (passedName === ""){
      setNameError("Name is required.")
    }else{
      setNameError("")
    }
  }, []);

  useEffect(() => {
    handlePasswordError('');
    handlePasswordAgainError('', '');
    handleEmailChange('');
    handleNameChange('')
  }, [handlePasswordError, handlePasswordAgainError, handleEmailChange, handleNameChange]);

  return (
      <form onSubmit={handleSubmit}>
        <Grid container direction="column" spacing={2}>
          <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
            <Box textAlign="center">
              <h2 style={{ color: 'var(--color1)' }}>Sign Up</h2>
            </Box>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center" alignItems="center" className={'errorGrid'}>
            <TextField className="outlined-basic" label="Name" variant="outlined" type="text" value={name} autoFocus onChange={(e) => handleNameChange(e.target.value)} color={name !== "" ? 'success' : 'error' } error={!Boolean(name)}/>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center" alignItems="center" className={'errorGrid'}>
            { nameError ? 
            <AlertStyled  className={`no-background-alert`} severity="error">
              <Typography variant="caption">{nameError}</Typography>
            </AlertStyled> :<></>}
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
            <TextField className="outlined-basic" label="Email" variant="outlined" type="email" value={email} onChange={(e) => handleEmailChange(e.target.value)} error={Boolean(emailError)} color={!Boolean(emailError) ? 'success' : 'error' }/>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center" alignItems="center" className={'errorGrid'}>
            { emailError ? 
            <AlertStyled  className={`no-background-alert`} severity="error">
              <Typography variant="caption">{emailError}</Typography>
            </AlertStyled> :<></>}
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
            <TextField className="outlined-basic" label="Password" variant="outlined" type="password" value={password} onChange={(e) => handlePasswordChange(e.target.value)} error={Boolean(passwordError.length)} color={!Boolean(passwordError.length) ? 'success' : 'error' }/>
          </Grid>
            { passwordError.length > 0 && passwordError.map((error, index) =>
              <Grid item xs={12} display="flex" justifyContent="center" alignItems="center" key={index} className={'errorGrid'}>
                <AlertStyled  key={index} className={`no-background-alert`} severity="error">
                  <Typography variant="caption">{error}</Typography>
                </AlertStyled>
              </Grid>
            )}
          <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
            <TextField className="outlined-basic" label="Password Again" variant="outlined" type="password" value={passwordAgain} onChange={(e) => handlePasswordAgainChange(e.target.value)} error={Boolean(passwordAgainError)} color={!Boolean(passwordAgainError) ? 'success' : 'error' }/>
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
            { passwordAgainError ? 
            <AlertStyled  className={`no-background-alert`} severity="error">
              <Typography variant="caption">{passwordAgainError}</Typography>
            </AlertStyled> :<></>}
          </Grid>
          <Grid item xs={12} display="flex" justifyContent="center" alignItems="center">
            <Box textAlign="center">
              <Button variant="contained" type="submit">
                Sign Up
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
  );
};

export default SignupForm;
