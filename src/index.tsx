import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from '@/App';
import { withStores } from '@/store';

const root = ReactDOM.createRoot(document.getElementById('root')!);

const Main = withStores(() => {
  return <App />;
});

root.render(<Main />);
