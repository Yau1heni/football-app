import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import 'styles/styles.scss';
import App from './App.tsx';

const root = createRoot(document.getElementById('root') as HTMLDivElement);

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
