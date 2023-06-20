import React, { useContext } from 'react';
import { PopupContext } from './PopupContext';
import ProfilePopupContent from '../components/ProfilePopupContent';
import LogoutPopupContent from '../components/LogoutPopupContent';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
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
      case 'profile':
        return <ProfilePopupContent />;
      case 'logout':
        return <LogoutPopupContent />;
      // case 'account':
      //   return <AccountPopupContent />;
      // case 'dashboard':
      //   return <DashboardPopupContent />;
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