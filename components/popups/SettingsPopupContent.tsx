import React from 'react';
import SettingsForm from '../forms/SettingsForm';

interface SettingsPopupContextProps {
  closePopup: () => void;
}

const SettingsPopupContent: React.FC = ({ closePopup }: SettingsPopupContextProps) => {
  const onSuccess = () => {}

  return (
    <div>
      <SettingsForm onSuccess={onSuccess} onSubmit={closePopup}/>
    </div>
  );
};

export default SettingsPopupContent;
