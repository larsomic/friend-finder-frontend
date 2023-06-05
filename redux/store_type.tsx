export interface StoreType {
    loggedIn: boolean;
}

export interface LoginActions {
    type: 'LOG_IN' | 'LOG_OUT';
  }