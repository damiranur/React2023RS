import React from "react";
import classes from "./SearchBar.module.css";
import { fetchSearchPlanet } from "../../apis/PlanetsApi";
import { IPlanetData } from "../../types";

interface IProps {
  changeInput: (text: string) => void;
  value: string;
  changeData: (planets: IPlanetData[]) => void;
  changeLoading: (loading: boolean) => void;
  setCurrentPage: (currentPage: number) => void;
  changeDataCount: (dataCount: number) => void;
}
export const SearchBar: React.FC<IProps> = (props) => {
  const onInputChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    props.changeInput((event.target as HTMLInputElement).value);
  };

  const onFormSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    props.changeLoading(true),
      fetchSearchPlanet(props.value, 1).then((data) => {
        props.changeData(data.results);
        localStorage.setItem("inputValue", props.value);
        props.changeDataCount(data.count);
        props.setCurrentPage(1);
      });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <input
        type="text"
        placeholder="Search planet by the name..."
        className={classes.search}
        value={props.value}
        onChange={onInputChange}
      />
    </form>
  );
};
