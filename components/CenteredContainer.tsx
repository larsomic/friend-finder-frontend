import { Container, ContainerProps, Grid, FormEventHandler } from '@mui/material';

interface CenteredContainerProps extends ContainerProps {
  handleSubmit: FormEventHandler;
}

const CenteredContainer: React.FC<CenteredContainerProps> = ({ children, handleSubmit, ...props }) => {
  return (
    <Container
      {...props}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'center',
        ...props.sx,
      }}
    >
      <form onSubmit={handleSubmit} style={{ width: '100%' }}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          {children}
        </Grid>
      </form>
    </Container>
  );
};

export default CenteredContainer;