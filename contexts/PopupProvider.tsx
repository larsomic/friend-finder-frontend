import React, { useState } from 'react';
import { PopupContext, PopupType } from './PopupContext';

interface PopupProviderProps {
  children: React.ReactNode;
}

export const PopupProvider: React.FC<PopupProviderProps> = ({ children }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState<PopupType | null>(null);
  const [extraData, setExtraData] = useState('');

  const openPopup = (content: PopupType, extraData?:string) => {
    setPopupContent(content);
    setIsPopupOpen(true);
    if (extraData){
      setExtraData(extraData)
    }
  }

  const closePopup = () => {
    setIsPopupOpen(false);
    setPopupContent(null);
    setExtraData('');
  }
  
  return (
    <PopupContext.Provider value={{ isPopupOpen, popupContent, openPopup, closePopup, extraData }}>
      {children}
    </PopupContext.Provider>
  );
};

export default PopupProvider;