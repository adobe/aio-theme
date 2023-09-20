import React, { Component } from 'react';
import { IllustratedMessage } from './IllustratedMessage';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo,
    });
  }

  errorMessage = { errorInfo: this.state?.errorInfo?.componentStack };

  render() {
    if (this.state.hasError) {
      return <IllustratedMessage errorBoundary={this.errorMessage} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

