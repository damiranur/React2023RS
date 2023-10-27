import React from "react";
import classes from "./Button.module.css";

interface IProps {
  handleClick: () => void;
  children: string;
  className?: string;
}
export default class Button extends React.Component<IProps> {
  handleClick = (event: React.SyntheticEvent) => {
    event.preventDefault();
    this.props.handleClick();
  };
  render() {
    return (
      <button className={classes.button} onClick={this.handleClick}>
        {this.props.children}
      </button>
    );
  }
}
