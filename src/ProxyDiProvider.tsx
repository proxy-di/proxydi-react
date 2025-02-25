import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { ProxyDiContainer } from 'proxydi';
import { ProxyDiContext } from './ProxyDiContext';
import { useProxyDiContainer } from './useProxyDiContainer';

interface ProxyDiProviderProps {
  children: ReactNode;
  init?: (container: ProxyDiContainer) => void;
  container?: ProxyDiContainer;
}

/**
 * Provides a ProxyDi container to its child components.
 * If a container is not provided (the recommended usage), a new container will be created.
 * If this provider is nested within another ProxyDiProvider,
 * the newly created container will be a child of the container from the parent ProxyDiProvider.
 *
 * @param {Function} [props.init] - Function to initialize the container's dependencies. This is the recommended way to register dependencies in the container.
 * @param {ProxyDiContainer} [props.container] - An alternative, though not recommended, way to provide an initialized container instance.
 * @param {React.ReactNode} props.children - Child components that will have access to the container.
 */
export const ProxyDiProvider: React.FC<ProxyDiProviderProps> = ({
  children,
  container,
  init,
}) => {
  const parentContainer = useProxyDiContainer();

  const proxyDiContainer = useMemo(() => {
    const proxyDiContainer =
      container ??
      (parentContainer
        ? parentContainer.createChildContainer()
        : new ProxyDiContainer());

    if (init) {
      init(proxyDiContainer);
    }

    return proxyDiContainer;
  }, [container, parentContainer]);

  useEffect(() => {
    return () => {
      proxyDiContainer.destroy();
    };
  }, [proxyDiContainer]);

  return (
    <ProxyDiContext.Provider value={proxyDiContainer}>
      {children}
    </ProxyDiContext.Provider>
  );
};
