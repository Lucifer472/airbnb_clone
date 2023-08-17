"use client";

import { useEffect } from "react";
import { Empty } from "./components";

interface ErrorStateProps {
  error: Error;
}

const ErrorState: React.FC<ErrorStateProps> = ({ error }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return <Empty title="Uh Oh" subtitle="Something went wrong!" />;
};

export default ErrorState;
