export interface LoginActions {
    type: 'LOG_IN' | 'LOG_OUT' | 'SIGNED_UP' | 'RESET_STORE';
  }

interface AuthState {
    loggedIn: boolean;
}

export interface UserActions {
    type: 'GET_USER_INFO' | 'UPDATE_USER_INFO' | 'RESET_STORE';
    payload?: {
      name: string;
      email: string;
    };
  }

interface UserState {
    name: string | null;
    email: string | null;
}

export interface SettingsActions {
  type: 'GET_USER_SETTINGS' | 'UPDATE_USER_SETTINGS' | 'RESET_STORE';
  payload?: {
    darkMode: boolean;
    selectedColor: string;
  };
}

interface SettingsState {
  darkMode: boolean | null;
}

export interface StoreType {
    auth: AuthState;
    user: UserState;
    settings: SettingsState;
}
