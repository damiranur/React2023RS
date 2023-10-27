import React from "react";
import { FetchSearchPlanet } from "../../apis/Planets";
import { IPlanetData } from "../../types";
import Button from "../Button/Button";

interface IProps {
  changeData: (planets: IPlanetData[]) => void;
  value: string;
}
export default class SearchButton extends React.Component<IProps> {
  onClick = () => {
    FetchSearchPlanet(this.props.value).then((data) => {
      this.props.changeData(data.results);
      localStorage.setItem("inputValue", this.props.value);
    });
  };

  render() {
    return <Button handleClick={this.onClick}>Search</Button>;
  }
}
