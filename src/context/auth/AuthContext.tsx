import { createContext } from 'react';
import { SignupFields, User } from '../../interfaces/user';

interface ContextProps {
  status: string;
  user: User | null;
  student: number | null;
  checkAuthToken: () => void;
  signIn: (email: string, password: string) => void;
  signUp: (signupFields: SignupFields) => void;
  setStudentId: (studentId: number) => void;
  logoutAuth: () => void;
}

export const AuthContext = createContext({} as ContextProps);
