import SignupForm from '../components/SignupForm';
import { useRouter } from 'next/router';
import CenteredContainer from '../components/CenteredContainer';

const Signup = () => {
  const router = useRouter();

  const handleSignup = () => {
    router.push('/');
  };

  return (
    <CenteredContainer maxWidth="sm">
      <SignupForm onSignup={handleSignup} />
    </CenteredContainer>
  );
};

export default Signup;