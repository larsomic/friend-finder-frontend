import { createContext } from 'react';

export type PopupType = 'profile' | 'account' | 'dashboard' | 'logout' | 'signup' | 'login';

interface PopupContextType {
  isPopupOpen: boolean;
  popupContent: PopupType | null;
  openPopup: (content: PopupType) => void;
  closePopup: () => void;
}

export const PopupContext = createContext<PopupContextType | undefined>(undefined);


