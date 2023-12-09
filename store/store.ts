import { atom } from "jotai";

// Jotai atoms for state management
export const loadingAtom = atom<boolean>(false); // Loading state
export const isConnectedAtom = atom<boolean>(false); // Connection state
export const currentToDoAtom = atom<ToDoItem | null>(null); // Currently selected ToDo item
export const toDoListAtom = atom<ToDoItem[]>([]); // List of ToDo items
export const toDoAtom = atom<string>(""); // Single ToDo item

// Type definition for ToDo items
export interface ToDoItem {
  id: number;
  content: string;
  completed: boolean;
}
