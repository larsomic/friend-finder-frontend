import axios from 'axios';
import { setUserInfo } from './userReducer';
import { MiddlewareAPI, Dispatch, AnyAction } from 'redux';

axios.defaults.withCredentials = true;

const requiredInfoMiddleware = (store: MiddlewareAPI) => (next: Dispatch<AnyAction>) => async (action: AnyAction) => {
    next(action); 

    const state = store.getState();
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
  };

  export default requiredInfoMiddleware;
