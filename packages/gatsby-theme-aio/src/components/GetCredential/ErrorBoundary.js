import React, { Component } from 'react';
import { IllustratedMessage } from './IllustratedMessage';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <IllustratedMessage errorBoundary={true} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

