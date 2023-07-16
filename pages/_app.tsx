import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createWrapper } from 'next-redux-wrapper';
import { store, persistor } from '../redux/store';
import type { AppProps } from 'next/app';
import { PopupProvider } from '../contexts/PopupProvider';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import '../styles/global.css';

const theme = createTheme({
  palette: {
    background: {
      default: '#f8f8f8', // Custom background color
    },
    primary: {
      main: '#2196f3', // Blue color
    },
    secondary: {
      main: '#2196f3', // Pink color
    },
  },
});

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PopupProvider>
          <ThemeProvider theme={theme}> 
            <Component {...pageProps} />
          </ThemeProvider>
        </PopupProvider>
      </PersistGate>
    </Provider> 
  );
};

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);

  
