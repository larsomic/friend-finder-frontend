export const setUserInfo = (name: string, email: string, isDemoUser: boolean) => ({
    type: 'UPDATE_USER_INFO' as const, 
    payload: { name, email, isDemoUser },
  });

export const setUserSettings = (darkMode: boolean, selectedColor:string) => ({
  type: 'UPDATE_USER_SETTINGS' as const, 
  payload: { darkMode, selectedColor },
});