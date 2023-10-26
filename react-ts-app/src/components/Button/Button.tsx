import React from "react";
import classes from "./Button.module.css";
import { FetchSearchPlanet } from "../../apis/Planets";
import { IPlanetData } from "../../types";

interface IProps {
  changeData: (planets: IPlanetData[]) => void;
  value: string;
}
export default class SearchButton extends React.Component<IProps> {
  onClick = (event: React.SyntheticEvent<HTMLButtonElement>) => {
    event.preventDefault();
    FetchSearchPlanet(this.props.value).then((data) => {
      this.props.changeData(data.results);
      localStorage.setItem("inputValue", this.props.value);
    });
  };

  render() {
    return (
      <button className={classes.button} onClick={this.onClick}>
        Search
      </button>
    );
  }
}
