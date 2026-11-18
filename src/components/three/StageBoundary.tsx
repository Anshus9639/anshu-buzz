"use client";

import { Component, type ReactNode } from "react";

type StageBoundaryProps = {
  children: ReactNode;
  onError?: () => void;
};

type StageBoundaryState = {
  hasError: boolean;
};

export class StageBoundary extends Component<
  StageBoundaryProps,
  StageBoundaryState
> {
  state: StageBoundaryState = { hasError: false };

  static getDerivedStateFromError(): StageBoundaryState {
    return { hasError: true };
  }

  componentDidCatch() {
    this.props.onError?.();
  }

  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}
