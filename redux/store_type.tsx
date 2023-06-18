export interface LoginActions {
    type: 'LOG_IN' | 'LOG_OUT' | 'SIGNED_UP';
  }

interface AuthState {
    loggedIn: boolean;
}

export interface UserActions {
    type: 'GET_USER_INFO' | 'UPDATE_USER_INFO';
    payload?: {
      name: string;
      email: string;
    };
  }

interface UserState {
    name: string | null;
    email: string | null;
}

export interface StoreType {
    auth: AuthState;
    user: UserState;
}


export const updateUserInfo = (name: string, email: string): UserActions => ({
    type: 'UPDATE_USER_INFO',
    payload: { name, email },
  });