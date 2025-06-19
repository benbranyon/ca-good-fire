'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  onError: (errorMessage: string) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class FireRiskMapErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('FireRiskMap Error Boundary caught an error:', error, errorInfo);
    
    // Notify parent component of the error
    this.props.onError(error.message || 'An unexpected error occurred with the map');
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center w-full h-full bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="text-center p-6">
            <div className="text-red-500 mb-4">
              <svg
                className="w-12 h-12 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Map Loading Error
            </h3>
            <p className="text-gray-600 mb-4">
              {this.state.error?.message || 'Unable to load the fire risk map'}
            </p>
            <button
              onClick={() => {
                this.setState({ hasError: false, error: null });
                this.props.onError('');
              }}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
} 