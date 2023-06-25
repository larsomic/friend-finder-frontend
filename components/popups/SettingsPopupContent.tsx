import React from 'react';
import SettingsForm from '../forms/SettingsForm';

const SettingsPopupContent: React.FC = () => {
  const onSuccess = () => {}

  return (
    <div>
      <SettingsForm onSuccess={onSuccess}/>
    </div>
  );
};

export default SettingsPopupContent;
