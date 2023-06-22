import { Container, ContainerProps, Grid } from '@mui/material';

interface CenteredContainerProps extends ContainerProps {}

const CenteredContainer: React.FC<CenteredContainerProps> = ({ children, ...props }) => {
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
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        {children}
      </Grid>
    </Container>
  );
};

export default CenteredContainer;
