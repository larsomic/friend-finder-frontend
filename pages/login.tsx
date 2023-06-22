import LoginForm from '../components/forms/LoginForm';
import { useRouter } from 'next/router';
import CenteredContainer from '../components/CenteredContainer';

const Login = () => {
  const router = useRouter();

  const handleLogin = () => {
    router.push('/');
  };

  return (
    <CenteredContainer maxWidth="sm">
      <LoginForm onLogin={handleLogin} />
    </CenteredContainer>
  );
};

export default Login;