'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class GlobalErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false
    };

    public static getDerivedStateFromError(_error: Error): State {
        return { hasError: true };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    public render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-stone-50 flex flex-col items-center justify-center px-6 text-center">
                    <h2 className="font-serif text-3xl text-stone-900 mb-4 tracking-tight uppercase">EXPERIENCE INTERRUPTED</h2>
                    <p className="text-stone-500 text-sm uppercase tracking-[0.2em] max-w-md mx-auto leading-relaxed mb-12">
                        A critical error occurred. Please refresh the page to restore the Dior universe.
                    </p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-8 py-3 bg-stone-900 text-white text-xs uppercase tracking-widest hover:bg-stone-800 transition-colors"
                    >
                        Refresh Page
                    </button>
                </div>
            );
        }

        return this.props.children;
    }
}

export default GlobalErrorBoundary;
