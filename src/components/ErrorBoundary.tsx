import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

/**
 * Last-resort net: a render error anywhere below here used to unmount the
 * whole app, leaving only the Ko-fi widget (injected outside React) visible
 * against the near-black body background. Reload is a real fix, not just a
 * placeholder — client-side route state is what got the tree into trouble.
 */
class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error('Render error caught by ErrorBoundary:', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="notfound">
          <h1 className="gradient-text">Oops</h1>
          <p>Something went wrong loading this page.</p>
          <button className="btn btn-primary" onClick={() => window.location.reload()}>
            Reload
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
