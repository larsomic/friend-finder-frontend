<<<<<<< HEAD
export interface LoginActions {
    type: 'LOG_IN' | 'LOG_OUT' | 'SIGNED_UP';
  }

interface AuthState {
    loggedIn: boolean;
}

export interface StoreType {
    auth: AuthState;
}
=======
export interface StoreType {
    loggedIn: boolean;
}

export interface LoginActions {
    type: 'LOG_IN' | 'LOG_OUT';
  }
>>>>>>> a860dfd059d8dd22f2a535227fa29745b01a95bf
