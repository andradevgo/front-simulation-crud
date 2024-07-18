import { createContext } from 'react';
import { Subject } from '../../interfaces/subject';
import { Program } from '../../interfaces/program';

interface ContextProps {
  loaded: boolean;
  program: Program | null; //Interfaz
  subjects: Subject[];
  logoutProgram: () => void;
}

export const ProgramContext = createContext({} as ContextProps);
