import React from "react";
import classes from "./Button.module.css";

interface IProps {
  handleClick: () => void;
  children: string;
  className?: string;
}
export const Button: React.FC<IProps> = (props) => {
  const handleClick = (event: React.SyntheticEvent) => {
    event.preventDefault();
    props.handleClick();
  };
  return (
    <button className={classes.button} onClick={handleClick}>
      {props.children}
    </button>
  );
};
