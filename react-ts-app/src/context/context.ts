import { MyState } from "./../App";
import { createContext } from "react";

interface IDataContext {
  myState: MyState;
  setMyState: React.Dispatch<React.SetStateAction<MyState>>;
}

interface ICurrentPageContext {
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}

export const MyContext = createContext<IDataContext | null>(null);
export const CurrentPageContext = createContext<ICurrentPageContext | null>(
  null,
);
