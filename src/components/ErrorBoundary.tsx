"use client";

import { Component, type ReactNode, type ErrorInfo } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("[ErrorBoundary]", error, errorInfo.componentStack);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;

      return (
        <div className="flex flex-col items-center justify-center py-12 px-6 text-center">
          <div className="w-full max-w-sm rounded-sm bg-red-500/[0.03] border border-red-500/[0.08] dark:bg-red-400/[0.04] dark:border-red-400/[0.08] overflow-hidden">
            <div className="flex items-center gap-1.5 px-3 py-1.5 border-b border-red-500/[0.06]">
              <AlertTriangle size={11} className="text-red-500/60" />
              <span className="text-[9px] font-mono text-red-500/40 uppercase tracking-wider">Component Exception</span>
            </div>
            <div className="px-4 py-4 text-left">
              <p className="text-xs font-mono text-foreground/50 mb-1">
                <span className="text-red-500/50">[!]</span> 组件渲染失败
              </p>
              <p className="text-[11px] font-mono text-foreground/30 mb-4">
                {this.state.error?.message || "子组件在挂载时抛出异常"}
              </p>
              <button
                onClick={this.handleRetry}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-[11px] font-mono font-medium text-foreground/60 border border-divider hover:text-foreground hover:border-foreground/30 hover:bg-foreground/[0.03] transition-all duration-300 cursor-pointer"
              >
                <RotateCcw size={11} />
                重试
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
