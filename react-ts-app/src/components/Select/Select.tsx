import React, { ChangeEvent } from "react";
import classes from "./Select.module.css";

interface ISelectProps {
  changePlanetsPerPage: (planetsPerPage: number) => void;
}

export const Select: React.FC<ISelectProps> = ({ changePlanetsPerPage }) => {
  const changeSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    changePlanetsPerPage(Number(e.target.value) || 10);
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
