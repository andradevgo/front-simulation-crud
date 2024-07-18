import { User } from '../../interfaces/user';
import { AuthState } from './';

type AuthActionType =
  | { type: 'Auth - checking' }
  | { type: 'Auth - login', payload: User }
  | { type: 'Auth - logout' }
  | { type: 'Auth - updateUser', payload: User }
  | { type: 'Auth - setStudent', payload: number };

export const AuthReducer = (state: AuthState, action: AuthActionType): AuthState => {
  switch (action.type) {
    case 'Auth - checking':
      return {
        ...state,
        status: 'checking',
        student: null,
        user: null,
      };
    case 'Auth - login':
      return {
        ...state,
        status: 'authenticated',
        user: action.payload,
      };  
    case 'Auth - logout':
      return {
        ...state,
        status: 'not-authenticated',
        student: null,
        user: null,
      };
    case 'Auth - updateUser':
      return {
        ...state,
        user: action.payload,
      };

    case 'Auth - setStudent':
      return {
        ...state,
        student: action.payload,
      };
      
    default:
      return state;
  }
};
