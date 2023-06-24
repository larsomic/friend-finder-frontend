export const setUserInfo = (name: string, email: string) => ({
    type: 'UPDATE_USER_INFO' as const, 
    payload: { name, email },
  });

export const setUserSettings = (darkMode: boolean) => ({
  type: 'UPDATE_USER_SETTINGS' as const, 
  payload: { darkMode },
});