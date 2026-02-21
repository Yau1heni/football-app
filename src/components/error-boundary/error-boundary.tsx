import { StateMessage } from 'components/state-message';
import { Button } from 'components/ui/button';
import { Component, type ErrorInfo, type ReactNode } from 'react';

export type ErrorBoundaryProps = {
  children: ReactNode;
};

type ErrorBoundaryState = {
  hasError: boolean;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // eslint-disable-next-line no-console -- логирование ошибок в Error Boundary
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = (): void => {
    window.location.reload();
  };

  render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <StateMessage
            variant="error"
            title="Произошла ошибка"
            description="Попробуйте обновить страницу или повторить действие позже"
            action={
              <Button type="button" variant="primary" onClick={this.handleReload}>
                Обновить страницу
              </Button>
            }
          />
        </div>
      );
    }

    return this.props.children;
  }
}
