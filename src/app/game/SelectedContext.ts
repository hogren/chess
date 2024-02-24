import { createContext, Dispatch, SetStateAction } from 'react';

export const SelectedContext = createContext<{ line: number | undefined, column: string | undefined }>({ line: undefined, column: undefined });
export const UpdateSelectedContext = createContext<((column: string, line: number) => void) | undefined>(undefined);
