import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: '', info: '' };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    this.setState({ error, info });
  }

  render() {
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
