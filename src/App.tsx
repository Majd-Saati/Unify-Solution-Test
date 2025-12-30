import { lazy, Suspense } from 'react';
import { LoadingSpinner } from './components/LoadingSpinner';

// Lazy load pages for code splitting
const BikeTheftListPage = lazy(() => import('./pages/BikeTheftListPage'));

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <BikeTheftListPage />
    </Suspense>
  );
}

export default App;
