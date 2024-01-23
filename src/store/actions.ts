// Original action types
export const USER_RESET = 'USER_RESET';
export const GET_USERS = 'GET_USERS';
export const UPDATE_USER = 'UPDATE_USER';
export const DELETE_USER = 'DELETE_USER';
export const SAVE_USER = 'SAVE_USER';

// Generate corresponding pending, fulfilled, and rejected action types
const generateAsyncActionTypes = (actionType: string) => ({
  PENDING: `${actionType}_PENDING`,
  FULFILLED: `${actionType}_FULFILLED`,
  REJECTED: `${actionType}_REJECTED`,
});

// Applying the generator to the original action types
export const GET_USERS_ASYNC = generateAsyncActionTypes(GET_USERS);
export const UPDATE_USER_ASYNC = generateAsyncActionTypes(UPDATE_USER);
export const DELETE_USER_ASYNC = generateAsyncActionTypes(DELETE_USER);
export const SAVE_USER_ASYNC = generateAsyncActionTypes(SAVE_USER);
