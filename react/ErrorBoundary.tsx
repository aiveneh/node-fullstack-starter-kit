import React, { Component } from 'react';

interface IState {
  hasError: any;
  error: any;
  info: any;
}

export default class ErrorBoundary extends Component<{}, IState> {

  public static getDerivedStateFromError() {
    return { hasError: true };
  }
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: '', info: '' };
  }

  public componentDidCatch(error, info) {
    this.setState({ error, info });
  }

  public render() {
    const { hasError, error, info } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div style={{ padding: '20px' }}>
          <h6 style={{ fontSize: '12px', color: 'red' }}>
            Something went wrong,
            {error.toString()}
            {info.componentStack}
          </h6>
        </div>
      );
    }
    return children;
  }
}
