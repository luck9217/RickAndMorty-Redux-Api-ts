import React from "react";

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Refersh to status for next one render, show you spare interface

    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // También puedes registrar el error en un servicio de reporte de errores
  }

  render() {
    if (this.state.hasError) {
      // You can render any spare interface
      return (
        <>
          <h1>Something went wrong...</h1>;
        </>
      );
    }

    return this.props.children;
  }
}
