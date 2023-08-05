import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createWrapper } from 'next-redux-wrapper';
import { store, persistor } from '../redux/store';
import type { AppProps } from 'next/app';
import { PopupProvider } from '../contexts/PopupProvider';
import { ThemeProvider } from '@mui/material/styles'; 
import { createTheme, useTheme, Theme } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';
import '../styles/global.css';

const customTheme = (outerTheme: Theme) =>
createTheme({
  palette: {
    mode: outerTheme.palette.mode,
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '--TextField-brandBorderColor': 'var(--color1)',
          '--TextField-brandBorderHoverColor': 'var(--color1)',
          '--TextField-brandBorderFocusedColor': 'var(--color1)',
          '& label.Mui-focused': {
            color: 'var(--color1)',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: 'var(--color1)',
        },
        root: {
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: 'var(--color1)',
          },
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: 'var(--color1)',
            // backgroundColor: 'var(--color5)'
          },
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            color: 'var(--color5)',
            backgroundColor: 'var(--color4)',
            '&:hover': {
              backgroundColor: 'var(--color3)', 
            },
          },
        },
      ],
    },
    MuiList:{
      styleOverrides:{
        root:{
          'background-color': 'var(--color5)  ',
        }
      }
    }

  },
});


const MyApp = ({ Component, pageProps }: AppProps) => {
  const outerTheme = useTheme();

  return (
    <ThemeProvider theme={customTheme(outerTheme)}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <PopupProvider>
            <Component {...pageProps} />
          </PopupProvider>
        </PersistGate>
      </Provider> 
    </ThemeProvider>
  );
};

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
