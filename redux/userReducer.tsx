export const setUserInfo = (name: string, email: string) => ({
    type: 'UPDATE_USER_INFO' as const, 
    payload: { name, email },
  });