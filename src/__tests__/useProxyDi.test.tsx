import React, { Component, ReactNode } from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { ProxyDiProvider } from '../ProxyDiProvider';
import { useProxyDi } from '../useProxyDi';
import { ProxyDiContainer } from 'proxydi';

class TestService {
  constructor(public readonly name = 'Test service') {}
}

const TestDummy = () => {
  const dependency = useProxyDi<TestService>('service');
  return <div data-testid="dependency">{dependency.name}</div>;
};

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { error };
  }

  render() {
    if (this.state.error) {
      return <div data-testid="error">{this.state.error.message}</div>;
    }
    return this.props.children;
  }
}

describe('useProxyDi()', () => {
  it('should resolve dependency', async () => {
    const container = new ProxyDiContainer({ allowRegisterAnything: true });
    container.registerDependency(TestService, 'service');

    render(
      <ProxyDiProvider container={container}>
        <TestDummy />
      </ProxyDiProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('dependency').textContent).toBe('Test service');
    });
  });

  it('should resolve parnt dependency', async () => {
    const container = new ProxyDiContainer({ allowRegisterAnything: true });
    container.registerDependency(TestService, 'service');

    render(
      <ProxyDiProvider container={container}>
        <ProxyDiProvider>
          <TestDummy />
        </ProxyDiProvider>
      </ProxyDiProvider>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('dependency').textContent).toBe('Test service');
    });
  });

  it('should throw error when used outside of ProxyDiProvider', async () => {
    render(
      <ErrorBoundary>
        <TestDummy />
      </ErrorBoundary>,
    );

    await waitFor(() => {
      expect(screen.getByTestId('error').textContent).toContain(
        'useProxyDi must be used within a ProxyDiProvider',
      );
    });
  });
});
