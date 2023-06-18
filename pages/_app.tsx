import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { createWrapper } from 'next-redux-wrapper';
import { store, persistor, updateUser } from '../redux/store';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import axios from 'axios';

import '../styles/global.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(process.env.NEXT_PUBLIC_BASE_API_URL + '/api/user');
        const { name, email } = response.data;
        store.dispatch(updateUser(name, email));
      } catch (error) {
        // Handle error
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Component {...pageProps} />
      </PersistGate>
    </Provider>
  );
};

const makeStore = () => store;
const wrapper = createWrapper(makeStore);

export default wrapper.withRedux(MyApp);
