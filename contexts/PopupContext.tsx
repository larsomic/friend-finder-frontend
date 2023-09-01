import { createContext } from 'react';

export type PopupType = 'account' | 'preferences' | 'settings' | 'logout' | 'signup' | 'login' | 'friend-preferences' | 'user-viewer';

interface PopupContextType {
  isPopupOpen: boolean;
  popupContent: PopupType | null;
  openPopup: (content: PopupType, extraData?: string) => void;
  closePopup: () => void;
  extraData: string;
}

export const PopupContext = createContext<PopupContextType | undefined>(undefined);
