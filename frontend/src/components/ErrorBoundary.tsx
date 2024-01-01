import { Component, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

 

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div>
          <h2>Something went wrong.</h2>
          {/* You can customize the fallback UI here */}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
