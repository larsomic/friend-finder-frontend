import { createStore, combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { LoginActions } from './store_type'
import storage from 'redux-persist/lib/storage'; 

const userReducer = (state = { loggedIn: false }, action:LoginActions) => {
  switch (action.type) {
    case 'LOG_IN':
      return { ...state, loggedIn: true };
    case 'LOG_OUT':
      return { ...state, loggedIn: false };
<<<<<<< HEAD
    case 'SIGNED_UP':
      return { ...state, loggedIn: true };
=======
>>>>>>> a860dfd059d8dd22f2a535227fa29745b01a95bf
    default:
      return state;
  }
};

const rootReducer = combineReducers({
<<<<<<< HEAD
  auth: userReducer,
=======
  user: userReducer,
>>>>>>> a860dfd059d8dd22f2a535227fa29745b01a95bf
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
