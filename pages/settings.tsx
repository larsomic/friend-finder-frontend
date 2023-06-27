import SettingsForm from '../components/forms/SettingsForm';
import { useRouter } from 'next/router';
import CenteredContainer from '../components/CenteredContainer';

const Settings = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/');
  };

  return (
    <CenteredContainer maxWidth="sm">
      <SettingsForm onSuccess={handleLogin} onSubmit={handleLogin}/>
    </CenteredContainer>
  );
};

export default Settings;