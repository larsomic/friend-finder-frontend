import axios from 'axios';
import { setUserInfo, setUserSettings } from './userReducer';
import { MiddlewareAPI, Dispatch, AnyAction } from 'redux';
import {handleDarkMode, handleColorTheme} from '../util/handleTheme';
import { persistor } from './store';

axios.defaults.withCredentials = true;

const requiredMiddleware = (store: MiddlewareAPI) => (next: Dispatch<AnyAction>) => async (action: AnyAction) => {
    next(action); 

    const state = store.getState();
    if (state.auth.loggedIn) {
      if (!state.user.name) {
        try {
          const response = await axios.get(process.env.NEXT_PUBLIC_BASE_API_URL + "/api/user");
          console.log('Response status:', response.status);
          if (response.status == 200) {
            store.dispatch(setUserInfo(response.data.name, response.data.email ));
          }
        } catch (error: any) {
          if (error.response.status == 401) {
            store.dispatch({ type: 'RESET_STORE' });
            persistor.purge();
          }
          console.error("Error fetching user info:", error);
        }
      }
      if (state.settings.darkMode === undefined || state.settings.darkMode === null ) {
        try {
          const response = await axios.get(process.env.NEXT_PUBLIC_BASE_API_URL + "/api/user/settings");
          if (response.status == 200) {
            store.dispatch(setUserSettings(response.data.darkMode, response.data.selectedColor ));
          }
        } catch (error: any) {
          if (error.response.status == 401) {
            store.dispatch({ type: 'RESET_STORE' });
            persistor.purge();
          }
        }
      }
      if (typeof state.settings.darkMode !== 'undefined' || state.settings.darkMode !== null ){   
        handleDarkMode(state.settings.darkMode);
      }
      if (typeof state.settings.selectedColor !== 'undefined' || state.settings.selectedColor !== null ){   
        handleColorTheme(state.settings.selectedColor);
      }
    }
  };

  export default requiredMiddleware;
