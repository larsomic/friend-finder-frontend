import React, { useContext, useEffect } from 'react';
import { PopupContext } from './PopupContext';
import AccountPopupContent from '../components/popups/AccountPopupContent';
import FriendPreferencesPopupContent from '../components/popups/FriendPreferencesPopupContent';
import LogoutPopupContent from '../components/popups/LogoutPopupContent';
import LoginPopupContent from '../components/popups/LoginPopupContent';
import SignupPopupContent from '../components/popups/SignupPopupContent';
import SettingsPopupContent from '../components/popups/SettingsPopupContent';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
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
  };

  const closePopupAndAlert = () => {
    handleAlertClose();
    closePopup();
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        closePopupAndAlert();
      }, 3000);

      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [showAlert]);

  const renderContent = (closePopupAndAlert: () => void) => {
    switch (popupContent) {
      case 'account':
        return <AccountPopupContent setShowAlert={setShowAlert} setAlertMessage={setAlertMessage} setAlertType={setAlertType} closePopupAndAlert={closePopupAndAlert}/>;
      case 'logout':
        return <LogoutPopupContent setShowAlert={setShowAlert} setAlertMessage={setAlertMessage} setAlertType={setAlertType} showAlert={showAlert}/>;
      case 'login':
        return <LoginPopupContent setShowAlert={setShowAlert} setAlertMessage={setAlertMessage} setAlertType={setAlertType} />;
      case 'signup':
        return <SignupPopupContent setShowAlert={setShowAlert} setAlertMessage={setAlertMessage} setAlertType={setAlertType} closePopupAndAlert={closePopupAndAlert}/>;
      case 'friend-preferences':
        return <FriendPreferencesPopupContent closePopup={closePopupAndAlert} setShowAlert={setShowAlert} setAlertMessage={setAlertMessage} setAlertType={setAlertType} />;
      case 'settings':
        return <SettingsPopupContent closePopup={closePopupAndAlert} setShowAlert={setShowAlert} setAlertMessage={setAlertMessage} setAlertType={setAlertType} />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isPopupOpen} TransitionComponent={Transition} onClose={closePopup} scroll={'body'} fullWidth={true} maxWidth={'sm'}>
      {showAlert && (
        <Grid item xs={12}>
          <Alert severity={alertType} onClose={handleAlertClose}>
            {alertMessage}
          </Alert>
        </Grid>
      )}
      <DialogContent>{renderContent(closePopupAndAlert)}</DialogContent>
    </Dialog>
  );
};

export default Popup;
