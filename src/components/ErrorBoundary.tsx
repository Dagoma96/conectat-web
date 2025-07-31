import React from 'react';

type Props = { label: string; children: React.ReactNode };
type State = { hasError: boolean; message?: string };

export default class ErrorBoundary extends React.Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: unknown) {
    return { hasError: true, message: String(error) };
  }

  componentDidCatch(error: unknown, info: unknown) {
    console.error(`❌ Error en ${this.props.label}:`, error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 my-4 border rounded text-red-700 bg-red-50">
          <strong>Sección con error:</strong> {this.props.label}
          {this.state.message ? <div className="mt-2 text-sm">{this.state.message}</div> : null}
        </div>
      );
    }
    return this.props.children;
  }
}