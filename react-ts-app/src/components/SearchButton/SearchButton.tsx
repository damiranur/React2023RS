import React from "react";
import { fetchSearchPlanet } from "../../apis/PlanetsApi";
import { IPlanetData } from "../../types";
import { Button } from "../Button/Button";

interface IProps {
  changeData: (planets: IPlanetData[]) => void;
  value: string;
  currentPage: number;
  changeLoading: (loading: boolean) => void;
}
export const SearchButton: React.FC<IProps> = (props) => {
  const onClick = () => {
    props.changeLoading(true),
      fetchSearchPlanet(props.value, props.currentPage).then((data) => {
        props.changeData(data.results);
        localStorage.setItem("inputValue", props.value);
      });
  };
  return <Button handleClick={onClick}>Search</Button>;
};
