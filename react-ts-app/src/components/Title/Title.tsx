import React from "react";
import classes from "./Title.module.css";

export const Title: React.FC = () => {
  return (
    <h1 className={classes.title}>
      Star Wars<br></br>Planets
    </h1>
  );
};
