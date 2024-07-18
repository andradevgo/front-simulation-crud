import {
  FC,
  PropsWithChildren,
  useContext,
  useEffect,
  useReducer,
} from 'react';
import { ProgramContext, ProgramReducer } from './';
import { Subject } from '../../interfaces/subject';
import { Program } from '../../interfaces/program';
import { AuthContext } from '../auth';
import api from '../../api';

export interface ProgramState {
  loaded: boolean;
  program: Program | null;
  subjects: Subject[]; // Add the 'subjects' property
}

const PROGRAM_INITIAL_STATE: ProgramState = {
  loaded: false,
  program: null,
  subjects: [],
};

export const ProgramProvider: FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(ProgramReducer, PROGRAM_INITIAL_STATE);

  const { student } = useContext(AuthContext);
  useEffect(() => {
    dispatch({ type: 'Program - notLoaded' });
    if (student) {
      const loadProgram = async () => {
        try {
          const response = await api.get(`/program/student/${student}`);
          console.log({ response });
          const program: Program = await response.data.Program;
          dispatch({ type: 'Program - setProgram', payload: program });
          if (program.Id) {
            dispatch({ type: 'Program - loaded' });
            const response = await api.get(`subjects/${program.Id}/program`);
            const subjects = response.data;

            dispatch({ type: 'Program - setSubjects', payload: subjects });
          }
        } catch (error) {
          console.log(error);
          dispatch({ type: 'Program - loaded' });
        }
      };
      loadProgram();
    } else {
      dispatch({ type: 'Program - loaded' });
    }
  }, [student]);

  const logoutProgram = () => {
    dispatch({ type: 'Program - Logout' });
  };
  return (
    <ProgramContext.Provider
      value={{
        ...state,
        logoutProgram,
      }}
    >
      {children}
    </ProgramContext.Provider>
  );
};
