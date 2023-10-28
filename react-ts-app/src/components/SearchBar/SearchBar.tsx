import React from "react";
import classes from "./SearchBar.module.css";
import { FetchSearchPlanet } from "../../apis/Planets";
import { IPlanetData } from "../../types";

interface IProps {
  changeInput: (text: string) => void;
  value: string;
  changeData: (planets: IPlanetData[]) => void;
  changeLoading:(loading: boolean)=>void;
}
export default class SearchBar extends React.Component<IProps> {
  onInputChange = (event: React.SyntheticEvent<HTMLInputElement>) => {
    this.props.changeInput((event.target as HTMLInputElement).value);
  };

  onFormSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    this.props.changeLoading(true),
    FetchSearchPlanet(this.props.value).then((data) => {
      this.props.changeData(data.results);
      localStorage.setItem("inputValue", this.props.value);
    });
  };

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <input
          type="text"
          placeholder="Search planet by the name..."
          className={classes.search}
          value={this.props.value}
          onChange={this.onInputChange}
        />
      </form>
    );
  }
}
