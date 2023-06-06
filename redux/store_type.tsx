export interface LoginActions {
    type: 'LOG_IN' | 'LOG_OUT' | 'SIGNED_UP';
  }

interface AuthState {
    loggedIn: boolean;
}

export interface StoreType {
    auth: AuthState;
}