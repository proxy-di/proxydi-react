# @proxydi/react

[![Coverage Status](https://coveralls.io/repos/github/proxy-di/proxydi-react/badge.svg?branch=coverage-badge)](https://coveralls.io/github/proxy-di/proxydi-react?branch=coverage-badge)

React wrapper for [ProxyDi](https://www.npmjs.com/package/proxydi) library

<img src="https://github.com/proxy-di/proxydi-react/blob/main/assets/ProxyDiReactLogo.png?raw=true" width="196">

## Installation

Install the library with its core dependency:

```shell
npm install @proxydi/react proxydi
```

## Configuring container

In your main application file (e.g., `index.tsx`) wrap your components by [< ProxyDiProvider />](https://proxy-di.github.io/proxydi-react/functions/ProxyDiProvider.html) to give them access to dependencies in [ProxyDiContainer](https://proxy-di.github.io/proxydi/classes/ProxyDiContainer.html)

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { ProxyDiProvider } from '@proxydi/react';
import { ProxyDiContainer } from 'proxydi';
import App from './App';
import MyService from './MyService';

const initAppDependencies = (container: ProxyDiContainer) => {
  container.register(MyService, 'My-Service');
};

ReactDOM.render(
  <ProxyDiProvider init={initAppDependencies}>
    <App />
  </ProxyDiProvider>,
  document.getElementById('root'),
);
```

## Using Dependencies

In your React component, access your services via the [useProxyDi()](https://proxy-di.github.io/proxydi-react/functions/useProxyDi.html) hook.

```tsx
import React from 'react';
import { useProxyDi } from '@proxydi/react';
import MyService from './MyService';

const MyComponent = () => {
  const myService = useProxyDi<MyService>('My-Service');

  return (
    <div>
      <h1>Data from MyService:</h1>
      <p>{myService.getData()}</p>
    </div>
  );
};

export default MyComponent;
```

## Nesting ProxyDiProvider

You can use nested `<ProxyDiProvider />` instances when you need a [child container](https://proxy-di.github.io/proxydi/#hierarchy-of-containers).

## Contributing

Contribution documentation is not ready yet but is planned. Feel free to contribute even now though! :)

## License

This project is licensed under the terms of the MIT License. See the [LICENSE](./LICENSE) file for details.
