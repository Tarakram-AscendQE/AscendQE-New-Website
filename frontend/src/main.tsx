import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from '@/App';
import '@/styles/tailwind.css';
import '@/styles/site.css';
import '@/styles/lean.css';
import '@/styles/layout.css';
import '@/styles/legal.css';
import '@/styles/about.css';
import '@/styles/contact.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
