import React from 'react';
import { useSelector } from 'react-redux';
import { StoreType } from '../../redux/store_type';
import SettingsForm from '../forms/SettingsForm';

interface SettingsPopupContextProps {
  closePopup: () => void;
}

const SettingsPopupContent: React.FC = ({ closePopup }: SettingsPopupContextProps) => {
  const lightMode = true;

  return (
    <div>
      <SettingsForm lightMode onSubmit={closePopup}/>
    </div>
  );
};

export default SettingsPopupContent;
