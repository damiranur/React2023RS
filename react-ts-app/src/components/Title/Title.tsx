import React from "react";
import classes from "./Title.module.css";

export class Title extends React.Component {
  render() {
    return <h1 className={classes.title}>Star Wars Planets</h1>;
  }
}
