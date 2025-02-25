# @proxydi/react

[![Coverage Status](https://coveralls.io/repos/github/proxy-di/proxydi-react/badge.svg?branch=coverage-badge)](https://coveralls.io/github/proxy-di/proxydi-react?branch=coverage-badge)

React wrapper for [ProxyDi](https://www.npmjs.com/package/proxydi) library

<img src="https://github.com/proxy-di/proxydi-react/blob/main/assets/ProxyDiReactLogo.png?raw=true" width="196">

## Usage

### Installation

Install the library with its core dependency:

```shell
npm install @proxydi/react proxydi
```

### Setup

In your main application file (e.g., `index.tsx`):

```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { ProxyDiProvider } from '@proxydi/react';
import { createContainer } from 'proxydi';
import App from './App';
import MyService from './MyService';

const initAppDependencies = (container: ProxyDiContainer) => {
  container.registerDependency(MyService, 'My-Service');
};

ReactDOM.render(
  <ProxyDiProvider init={initAppDependencies}>
    <App />
  </ProxyDiProvider>,
  document.getElementById('root'),
);
```

### Using Dependencies in a Components

In your React component, access your services via the `useProxyDi` hook:

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

To be continued...
