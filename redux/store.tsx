import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { LoginActions, UserActions, SettingsActions } from './store_type';
import requiredMiddleware from './requiredMiddleware';

const authReducer = (state = { loggedIn: false }, action: LoginActions) => {
  switch (action.type) {
    case 'LOG_IN':
      return { ...state, loggedIn: true };
    case 'LOG_OUT':
      return { ...state, loggedIn: false };
    case 'SIGNED_UP':
      return { ...state, loggedIn: true };
    case 'DEMO':
      return { ...state, loggedIn: true };
    case 'RESET_STORE':
      return { loggedIn: null}; 
    default:
      return state;
  }
};

const userReducer = (state = { name: null, email: null, isDemoUser: null }, action: UserActions) => {
  switch (action.type) {
    case 'GET_USER_INFO':
      return { ...state, name: action.payload?.name, email: action.payload?.email, isDemoUser: action.payload?.isDemoUser };
    case 'UPDATE_USER_INFO':
      return { ...state, name: action.payload?.name, email: action.payload?.email, isDemoUser: action.payload?.isDemoUser };
    case 'RESET_STORE':
      return { name: null, email: null, isDemoUser: false }; 
    case 'DEMO':
      return { isDemoUser: true }; 
    default:
      return state;
  }
};

const settingsReducer = (state = { darkMode: null, selectedColor:null }, action: SettingsActions) => {
  switch (action.type) {
    case 'GET_USER_SETTINGS':
      return { ...state, darkMode: action.payload?.darkMode, selectedColor: action.payload?.selectedColor };
    case 'UPDATE_USER_SETTINGS':
      return { ...state, darkMode: action.payload?.darkMode, selectedColor: action.payload?.selectedColor };
    case 'RESET_STORE':
      return { darkMode: null, selectedColor: null }; 
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  settings: settingsReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Comment this in to see redux in chrome.
// const composeEnhancers = typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
// export const store = createStore(
//   persistedReducer,
//   composeEnhancers(applyMiddleware(requiredMiddleware))
// );

// And comment out this line
export const store = createStore(persistedReducer, applyMiddleware(requiredMiddleware));

export const persistor = persistStore(store);
