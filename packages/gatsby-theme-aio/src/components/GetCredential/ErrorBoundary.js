import React, { Component } from 'react';
import { IllustratedMessage } from './IllustratedMessage';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorMsg: this.props.errorMessage
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo,
    });
  }


  render() {
    if (this.state.hasError) {
      return <IllustratedMessage errorMessage={this.errorMsg} />;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

