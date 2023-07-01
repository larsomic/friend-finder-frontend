import React, { useContext } from 'react';
import { PopupContext } from './PopupContext';
import AccountPopupContent from '../components/popups/AccountPopupContent';
import FriendPreferencesPopupContent from '../components/popups/FriendPreferencesPopupContent';
import LogoutPopupContent from '../components/popups/LogoutPopupContent';
import LoginPopupContent from '../components/popups/LoginPopupContent';
import SignupPopupContent from '../components/popups/SignupPopupContent';
import SettingsPopupContent from '../components/popups/SettingsPopupContent';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { AlertColor, Grid, Alert } from '@mui/material';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Popup: React.FC = () => {
  const popupContext = useContext(PopupContext);
  if (!popupContext) {
    throw new Error("PopupContext is undefined, make sure you're using the PopupProvider");
  }
  const { isPopupOpen, popupContent, closePopup } = popupContext;

  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMessage, setAlertMessage] = React.useState("");
  const [alertType, setAlertType] = React.useState<AlertColor>("error");

  const handleAlertClose = () => {
    setShowAlert(false);
  }

  const renderContent = () => {
    switch (popupContent) {
      case 'account':
        return <AccountPopupContent closePopup={closePopup} setShowAlert={setShowAlert} setAlertMessage={setAlertMessage} setAlertType={setAlertType}/>;
      case 'logout':
        return <LogoutPopupContent closePopup={closePopup} setShowAlert={setShowAlert} setAlertMessage={setAlertMessage} setAlertType={setAlertType}/>;      
      case 'login':
        return <LoginPopupContent setShowAlert={setShowAlert} setAlertMessage={setAlertMessage} setAlertType={setAlertType}/>;      
      case 'signup':
        return <SignupPopupContent setShowAlert={setShowAlert} setAlertMessage={setAlertMessage} setAlertType={setAlertType}/>;
      case 'friend-preferences':
         return <FriendPreferencesPopupContent closePopup={closePopup} setShowAlert={setShowAlert} setAlertMessage={setAlertMessage} setAlertType={setAlertType}/>;
      case 'settings':
        return <SettingsPopupContent closePopup={closePopup} setShowAlert={setShowAlert} setAlertMessage={setAlertMessage} setAlertType={setAlertType}/>;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isPopupOpen} TransitionComponent={Transition} onClose={closePopup}>
      {showAlert && 
        <Grid item xs={12}>
            <Alert severity={alertType} onClose={handleAlertClose}>
                {alertMessage}
            </Alert>
        </Grid>
      }
      <DialogContent>
        {renderContent()}
      </DialogContent>
      <DialogActions>
        <Button onClick={closePopup}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Popup;