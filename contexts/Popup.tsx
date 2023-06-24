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

  const renderContent = () => {
    switch (popupContent) {
      case 'account':
        return <AccountPopupContent />;
      case 'logout':
        return <LogoutPopupContent />;      
      case 'login':
        return <LoginPopupContent />;      
      case 'signup':
        return <SignupPopupContent />;
      case 'friend-preferences':
         return <FriendPreferencesPopupContent />;
      case 'settings':
        return <SettingsPopupContent />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={isPopupOpen} TransitionComponent={Transition} onClose={closePopup}>
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