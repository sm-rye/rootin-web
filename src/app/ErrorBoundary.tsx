import { Component } from 'react';
import type { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error) {
    console.error('[ErrorBoundary]', error);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex h-screen flex-col items-center justify-center gap-4">
          <p className="text-lg font-medium">문제가 발생했습니다.</p>
          <button
            className="rounded-md bg-[--primary-color] px-4 py-2 text-white"
            onClick={() => {
              this.setState({ hasError: false });
              window.location.href = '/';
            }}
          >
            홈으로 돌아가기
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
