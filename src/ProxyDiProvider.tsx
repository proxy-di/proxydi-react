import React, { ReactNode, useEffect, useMemo, useState } from 'react';
import { ProxyDiContainer } from 'proxydi';
import { ProxyDiContext } from './ProxyDiContext';
import { useProxyDiContainer } from './useProxyDiContainer';

interface ProxyDiProviderProps {
  children: ReactNode;
  container?: ProxyDiContainer;
}

export const ProxyDiProvider: React.FC<ProxyDiProviderProps> = ({
  children,
  container,
}) => {
  const parentContainer = useProxyDiContainer();

  const proxyDiContainer = useMemo(() => {
    return (
      container ??
      (parentContainer
        ? parentContainer.createChildContainer()
        : new ProxyDiContainer())
    );
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
