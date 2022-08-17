import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import reducer, { initialState } from "./reducers/reducers";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const store = {
    state,
    dispatch,
  };

  return <DataContext.Provider value={store}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);
