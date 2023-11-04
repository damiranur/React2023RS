import React, { useState, useEffect } from "react";
import { Button } from "../Button/Button";

interface ErrorState {
  hasError: boolean;
}

export const ErrorGenerator: React.FC<ErrorState> = () => {
  const [hasError, setHasError] = useState(false);

  const handleClick = () => {
    setHasError(true);
  };

  useEffect(() => {
    if (hasError) {
      throw new Error(
        "Something went wrong; please review your server connection!",
      );
    }
  });
  return <Button handleClick={handleClick}>Simulate Error</Button>;
};
