import { RouterProvider } from 'react-router-dom';
import { router } from './routes';
import { CookieConsent } from './components/layout/cookie-consent';

export function App() {
  return (
    <>
      <RouterProvider router={router} />
      <CookieConsent />
    </>
  );
}

export default App;
