import { createContext } from 'react';
import { Enrollment } from '../../interfaces/enrollment';

interface ContextProps {
  loaded: boolean;
  enrollments: Enrollment[];
  createEnrollment: (subjectId: number) => void;
  logoutEnrollment: () => void;
  loadEnrollments: () => void;
  deleteEnrollment: (enrollmentId: number) => void;
}

export const EnrollmentContext = createContext({} as ContextProps);
