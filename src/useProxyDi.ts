import { useProxyDiContainer } from './useProxyDiContainer';
import { DependencyId } from 'proxydi';

export const useProxyDi = <S>(dependencyId: DependencyId): S => {
  const container = useProxyDiContainer();

  if (!container) {
    throw new Error('useProxyDi must be used within a ProxyDiProvider');
  }
  return container.resolve<S>(dependencyId);
};
