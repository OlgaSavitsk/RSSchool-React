import { ErrorInfo, ReactNode } from "react";
import { FetchingError } from "../components/errors/fetching-error";
import * as React from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
};

export class ErrorBoundary extends React.Component<ErrorBoundaryProps> {
  state: {
    hasError: boolean;
    error?: Error;
  };

  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: undefined };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error };
  }

  componentDidCatch(error: Error, erroInfo: ErrorInfo) {
    console.log("Error caught!", erroInfo);
    console.error(error);
  }

  render() {
    if (this.state.hasError) {
      return <FetchingError error={this.state.error?.message || ""} />;
    } else return this.props.children;
  }
}
