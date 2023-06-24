import axios from 'axios';
import { setUserInfo, setUserSettings } from './userReducer';
import { MiddlewareAPI, Dispatch, AnyAction } from 'redux';

axios.defaults.withCredentials = true;

const handleDarkMode = (darkMode: boolean) => {
  const style = getComputedStyle(document.documentElement);
  const color1 = style.getPropertyValue('--permanent-color-1');
  const color2 = style.getPropertyValue('--permanent-color-2');
  if (darkMode){
    document.documentElement.style.setProperty('--light-dark-color-1', color2);
    document.documentElement.style.setProperty('--light-dark-color-2', color1);
  }
  else {
    document.documentElement.style.setProperty('--light-dark-color-1', color1);
    document.documentElement.style.setProperty('--light-dark-color-2', color2);
  }
}

const requiredMiddleware = (store: MiddlewareAPI) => (next: Dispatch<AnyAction>) => async (action: AnyAction) => {
    next(action); 

    const state = store.getState();
    console.log(state)
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
      if (state.settings.darkMode == null ) {
        try {
          const response = await axios.get(process.env.NEXT_PUBLIC_BASE_API_URL + "/api/user/settings");
          if (response.status == 200) {
            store.dispatch(setUserSettings(response.data.darkMode ));
          }
        } catch (error) {
          console.error("Error fetching user settings:", error);
        }
      }
      handleDarkMode(state.user.darkMode);
    }
  };

  export default requiredMiddleware;
