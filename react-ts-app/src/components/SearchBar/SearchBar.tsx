import React from "react";
import classes from "./SearchBar.module.css";

export default class SearchBar extends React.Component {
  render() {
    return (
      <input
        type="text"
        placeholder="Search planet"
        className={classes.search}
      />
    );
  }
}
