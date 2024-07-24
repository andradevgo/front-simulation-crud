import { FC, PropsWithChildren, useReducer } from 'react';
import { AuthContext, AuthReducer } from '.';
import { User, SignupFields } from '../../interfaces/user';
import api from '../../api';

export interface AuthState {
  status: string;
  user: User | null;
  student: number | null;
}

const AUTH_INITIAL_STATE: AuthState = {
  status: 'checking',
  user: null,
  student: null,
};

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, AUTH_INITIAL_STATE);

  const checkAuthToken = async () => {
    try {
      const response = await api.get('/auth/verify');
      const user = response.data;
      const student = await checkStudentByUser(user.Id);
      if (student) {
        dispatch({ type: 'Auth - setStudent', payload: student.Id });
      }
      dispatch({ type: 'Auth - login', payload: user });
    } catch (error) {
      console.log(error);
      dispatch({ type: 'Auth - logout' });
    }
  };

  const signIn = async (email: string, password: string, photo?: string) => {
    dispatch({ type: 'Auth - checking' });
    try {
      const response = await api.post('/auth/signin', {
        Email: email,
        Password: password,
        Photo: photo,
      });
      const user = response.data;
      const student = await checkStudentByUser(user.Id);
      if (student) {
        dispatch({ type: 'Auth - setStudent', payload: student.Id });
      }
      dispatch({ type: 'Auth - login', payload: user });
    } catch (error) {
      dispatch({ type: 'Auth - logout' });
      console.log(error);
    }
  };

  const signUp = async (signupFields: SignupFields) => {
    dispatch({ type: 'Auth - checking' });
    try {
      const { name, email, password, birthdate, documentType, documentNumber } =
        signupFields;
      const response = await api.post('/auth/signup', {
        Name: name,
        Email: email,
        Password: password,
        Birthdate: birthdate,
        Document_Type: documentType,
        Document_Number: documentNumber,
      });
      const user = response.data;
      const student = await checkStudentByUser(user.Id);
      if (student) {
        dispatch({ type: 'Auth - setStudent', payload: student.Id });
      }
      dispatch({ type: 'Auth - login', payload: user });
    } catch (error) {
      dispatch({ type: 'Auth - logout' });
      console.log(error);
    }
  };

  const checkStudentByUser = async (userId: number) => {
    try {
      const response = await api.get(`/student/user/${userId}`);
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const setStudentId = async (studentId: number) => {
    dispatch({ type: 'Auth - setStudent', payload: studentId });
  };

  const logoutAuth = async () => {
    const response = await api.post('/users/signout');
    console.log(response.data);
    dispatch({ type: 'Auth - logout' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        checkAuthToken,
        signIn,
        signUp,
        setStudentId,
        logoutAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};