import React, { createContext } from 'react';

export type PopupType = 'profile' | 'account' | 'dashboard' | 'logout';

interface PopupContextType {
  isPopupOpen: boolean;
  popupContent: PopupType | null;
  openPopup: (content: PopupType) => void;
  closePopup: () => void;
}

export const PopupContext = createContext<PopupContextType | undefined>(undefined);
