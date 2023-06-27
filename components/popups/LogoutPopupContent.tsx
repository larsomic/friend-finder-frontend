import LogoutForm from '../forms/LogoutForm';

interface LogoutPopupContentProps {
  closePopup: () => void;
}

const LogoutPopupContent = ({ closePopup }: LogoutPopupContentProps) => {
  return (
    <div>
      <LogoutForm onSubmit={closePopup}/>
    </div>
  );
};

export default LogoutPopupContent;