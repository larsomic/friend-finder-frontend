import { createContext } from 'react';

export type PopupType = 'account' | 'preferences' | 'dashboard' | 'logout' | 'signup' | 'login' | 'friend-preferences';

interface PopupContextType {
  isPopupOpen: boolean;
  popupContent: PopupType | null;
  openPopup: (content: PopupType) => void;
  closePopup: () => void;
}

export const PopupContext = createContext<PopupContextType | undefined>(undefined);
