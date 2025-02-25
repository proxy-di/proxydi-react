import { useProxyDiContainer } from './useProxyDiContainer';
import { DependencyId } from 'proxydi';

/**
 * Resolves a dependency from the ProxyDi container. A wrapper for the ProxyDiContainer.resolve() method.
 *
 * @template T - The type of the dependency to resolve.
 * @param {DependencyId} dependencyId - Identifier for the dependency.
 * @returns {T} The resolved dependency instance.
 *
 * @throws {Error} If dependency ID is unknown.
 * @throws {Error} If the hook is used outside of a ProxyDiProvider.
 */
export const useProxyDi = <T>(dependencyId: DependencyId): T => {
  const container = useProxyDiContainer();

  if (!container) {
    throw new Error('useProxyDi must be used within a ProxyDiProvider');
  }

  return container.resolve<T>(dependencyId);
};
