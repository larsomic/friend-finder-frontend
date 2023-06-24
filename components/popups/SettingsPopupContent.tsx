import React from 'react';
import { useSelector } from 'react-redux';
import { StoreType } from '../../redux/store_type';
import SettingsForm from '../forms/SettingsForm';

const SettingsPopupContent: React.FC = () => {
  const lightMode = true;

  return (
    <div>
      <SettingsForm lightMode />
    </div>
  );
};

export default SettingsPopupContent;
