import React, { ReactNode } from "react";
import Button from "../Button/Button";

interface Props {
  children?: ReactNode;
}

type ErrorState = {
  hasError: boolean;
};

export default class ErrorBoundary extends React.Component<Props, ErrorState> {
  state: ErrorState = {
    hasError: false,
  };

  public static getDerivedStateFromError() {
    return { hasError: true };
  }

  public componentDidCatch(error: unknown, errorInfo: React.ErrorInfo) {
    console.error("error", error, "errorInfo", errorInfo);
  }

  handleRevertError = () => {
    this.setState({ hasError: false });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <>
          <h2 style={{ color: "white", border: "1px solid white" }}>
            Error Boundary - Fallback UI
          </h2>
          <Button handleClick={this.handleRevertError}>Return</Button>
        </>
      );
    }
    return this.props.children;
  }
}
