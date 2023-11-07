import React, { ChangeEvent, useContext } from "react";
import classes from "./Select.module.css";
import { MyContext } from "../../context/context";

export const Select: React.FC = () => {
  const myContext = useContext(MyContext);
  const changeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    myContext?.setMyState((prev) => ({
      ...prev,
      planetsPerPage: Number(e.target.value) || 10,
    }));
  };
  return (
    <form className={classes.selectForm}>
      <label>Planets per page: </label>
      <select onChange={changeSelect}>
        <option>10</option>
        <option>20</option>
        <option>30</option>
      </select>
    </form>
  );
};
