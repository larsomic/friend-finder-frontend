import axios from 'axios';
import { setUserInfo, setUserSettings } from './userReducer';
import { MiddlewareAPI, Dispatch, AnyAction } from 'redux';
import handleDarkMode from '../util/handleDarkMode';

axios.defaults.withCredentials = true;

const requiredMiddleware = (store: MiddlewareAPI) => (next: Dispatch<AnyAction>) => async (action: AnyAction) => {
    next(action); 

    const state = store.getState();
    if (state.auth.loggedIn) {
      if (!state.user.name) {
        try {
          const response = await axios.get(process.env.NEXT_PUBLIC_BASE_API_URL + "/api/user");
          if (response.status == 200) {
            store.dispatch(setUserInfo(response.data.name, response.data.email ));
          }
        } catch (error) {
          console.error("Error fetching user info:", error);
        }
      }
      if (state.settings.darkMode === undefined || state.settings.darkMode === null ) {
        try {
          const response = await axios.get(process.env.NEXT_PUBLIC_BASE_API_URL + "/api/user/settings");
          console.log(response)
          if (response.status == 200) {
            store.dispatch(setUserSettings(response.data.darkMode ));
          }
        } catch (error) {
          console.error("Error fetching user settings:", error);
        }
      }
      if (typeof state.settings.darkMode !== 'undefined' || state.settings.darkMode !== null ){   
        handleDarkMode(state.settings.darkMode);
      }
    }
  };

  export default requiredMiddleware;
