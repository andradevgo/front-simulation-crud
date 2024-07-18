import { Enrollment } from '../../interfaces/enrollment';
import { EnrollmentState } from './';

type EnrollmentActionType =
  | { type: 'Enrollment - Load'; payload: Enrollment[] }
  | { type: 'Enrollment - Create'; payload: Enrollment }
  | { type: 'Enrollment - Delete'; payload: number }
  | { type: 'Enrollment - Logout' };

export const EnrollmentReducer = (
  state: EnrollmentState,
  action: EnrollmentActionType
): EnrollmentState => {
  switch (action.type) {
    case 'Enrollment - Load':
      return {
        ...state,
        loaded: true,
        enrollments: action.payload,
      };
    case 'Enrollment - Create':
      return {
        ...state,
        enrollments: [...state.enrollments, action.payload],
      };
    case 'Enrollment - Delete':
      return {
        ...state,
        enrollments: state.enrollments.filter(
          (enrollment) => enrollment.Id !== action.payload
        ),
      };
    case 'Enrollment - Logout':
      return {
        ...state,
        loaded: false,
        enrollments: [],
      };
    default:
      return state;
  }
};
