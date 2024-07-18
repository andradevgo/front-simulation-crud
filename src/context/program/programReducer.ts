import { Program } from '../../interfaces/program';
import { ProgramState } from './';
import { Subject } from '../../interfaces/subject';

type ProgramActionType =
  | { type: 'Program - setProgram'; payload: Program }
  | { type: 'Program - setSubjects'; payload: Subject[] }
  | { type: 'Program - loaded' }
  | { type: 'Program - notLoaded' }
  | { type: 'Program - Logout' };

export const ProgramReducer = (
  state: ProgramState,
  action: ProgramActionType
): ProgramState => {
  switch (action.type) {
    case 'Program - loaded':
      return {
        ...state,
        loaded: true,
      };

    case 'Program - notLoaded':
      return {
        ...state,
        loaded: false,
      };
    case 'Program - setProgram':
      return {
        ...state,
        program: action.payload,
        loaded: true,
      };
    case 'Program - setSubjects':
      return {
        ...state,
        loaded: true,
        subjects: action.payload,
      };
    case 'Program - Logout':
      return {
        ...state,
        loaded: false,
        program: null,
        subjects: [],
      };
    default:
      return state;
  }
};
