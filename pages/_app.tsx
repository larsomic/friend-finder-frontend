import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createWrapper } from 'next-redux-wrapper';
import { store, persistor } from '../redux/store';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { setUserInfo } from '../redux/userReducer'
import { PopupProvider } from '../contexts/PopupProvider';
import axios from 'axios';

import '../styles/global.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <PopupProvider>
          <Component {...pageProps} />
        </PopupProvider>
      </PersistGate>
    </Provider>
  );
};

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
