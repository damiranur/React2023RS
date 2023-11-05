import React from "react";
import { fetchSearchPlanet } from "../../apis/PlanetsApi";
import { IPlanetData } from "../../types";
import { Button } from "../Button/Button";

interface IProps {
  changeData: (planets: IPlanetData[]) => void;
  value: string;
  changeLoading: (loading: boolean) => void;
  changeDataCount: (dataCount: number) => void;
  setCurrentPage: (currentPage: number) => void;
}
export const SearchButton: React.FC<IProps> = (props) => {
  const onClick = () => {
    props.changeLoading(true),
      fetchSearchPlanet(props.value, 1).then((data) => {
        props.changeData(data.results);
        localStorage.setItem("inputValue", props.value);
        props.changeDataCount(data.count);
        props.setCurrentPage(1);
      });
  };
  return <Button handleClick={onClick}>Search</Button>;
};
