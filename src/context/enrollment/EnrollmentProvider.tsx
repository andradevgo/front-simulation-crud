import { FC, PropsWithChildren, useReducer } from 'react';
import { EnrollmentContext, EnrollmentReducer } from './';
import { Enrollment } from '../../interfaces/enrollment';
import api from '../../api';

export interface EnrollmentState {
  loaded: boolean;
  enrollments: Enrollment[]; // Add the 'subjects' property
}

const ENROLLMENT_INITIAL_STATE: EnrollmentState = {
  loaded: false,
  enrollments: [], // Add the 'subjects' property
};

export const EnrollmentProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(
    EnrollmentReducer,
    ENROLLMENT_INITIAL_STATE
  );

  const loadEnrollments = async () => {
    try {
      const response = await api.get('/enrollments/student');
      const enrollments: Enrollment[] = response.data;
      dispatch({ type: 'Enrollment - Load', payload: enrollments });
    } catch (error) {
      console.log(error);
    }
  };

  const createEnrollment = async (subjectId: number) => {
    try {
      const response = await api.post('/enrollments', {
        Subject_Id: subjectId,
      });
      const enrollment: Enrollment = response.data;
      dispatch({ type: 'Enrollment - Create', payload: enrollment });
    } catch (error: any) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const deleteEnrollment = async (enrollmentId: number) => {
    try {
      await api.delete(`/enrollments/${enrollmentId}`);
      dispatch({ type: 'Enrollment - Delete', payload: enrollmentId });
    } catch (error: any) {
      console.log(error);
      alert(error.response.data.message);
    }
  };

  const logoutEnrollment = () => {
    dispatch({ type: 'Enrollment - Logout' });
  };

  return (
    <EnrollmentContext.Provider
      value={{
        ...state,
        createEnrollment,
        loadEnrollments,
        logoutEnrollment,
        deleteEnrollment,
      }}
    >
      {children}
    </EnrollmentContext.Provider>
  );
};
