import React, { useState } from 'react';
import { PopupContext, PopupType } from './PopupContext';

export const PopupProvider: React.FC = ({ children }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState<PopupType | null>(null);

  const openPopup = (content: PopupType) => {
    setPopupContent(content);
    setIsPopupOpen(true);
  }

  const closePopup = () => {
    setIsPopupOpen(false);
    setPopupContent(null);
  }
  
  return (
    <PopupContext.Provider value={{ isPopupOpen, popupContent, openPopup, closePopup }}>
      {children}
    </PopupContext.Provider>
  );
};

export default PopupProvider;