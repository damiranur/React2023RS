import React from "react";
import Button from "../Button/Button";
import classes from './ErrorGenerator.module.css'

interface ErrorState {
  hasError: boolean;
}

export default class ErrorGenerator extends React.Component<
  unknown,
  ErrorState
> {
  state: ErrorState = {
    hasError: false,
  };
  handleClick = () => {
    this.setState({ hasError: true });
  };

  componentDidUpdate(): void {
    if (this.state.hasError) {
      throw new Error(
        "Something went wrong; please review your server connection!",
      );
    }
  }

  render() {
    return <div className={classes.errorBtn}><Button handleClick={this.handleClick}>Simulate Error</Button></div>
    ;
  }
}
