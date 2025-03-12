import { useProxyDiContainer } from './useProxyDiContainer';
import { DependencyClass, DependencyId } from 'proxydi';

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
export function useProxyDi<T>(dependencyId: DependencyId): T;
/**
 * Resolves a dependency from the ProxyDi container by class. A wrapper for the ProxyDiContainer.resolve() method.
 *
 * @template T - The dependency class.
 * @param {T} SomeClass - The class to resolve.
 * @returns {InstanceType<T>} The resolved dependency instance.
 *
 * @throws {Error} If class is not registered.
 * @throws {Error} If the hook is used outside of a ProxyDiProvider.
 */
export function useProxyDi<T extends DependencyClass<any>>(
  SomeClass: T,
): InstanceType<T>;
export function useProxyDi(dependencyIdOrClass: any): any {
  const container = useProxyDiContainer();

  if (!container) {
    throw new Error('useProxyDi must be used within a ProxyDiProvider');
  }

  return container.resolve(dependencyIdOrClass);
}
