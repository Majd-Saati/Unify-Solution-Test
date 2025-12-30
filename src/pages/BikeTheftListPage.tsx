import { BikeCard } from '../components/BikeCard';
import { useStolenBikes } from '../hooks/useBikes';
import './BikeTheftListPage.css';

function BikeTheftListPage() {
  const { data: bikes = [], isLoading, error, refetch } = useStolenBikes({ distance: 10 });

  return (
    <div className="bike-theft-page">
      <header className="page-header">
        <h1>🚴 Munich Bike Theft Reports</h1>
        <p className="subtitle">Stolen bikes reported in the Munich area</p>
      </header>

      <main className="page-main">
        {isLoading && (
          <div className="loading">
            <div className="spinner"></div>
            <p>Loading stolen bike reports...</p>
          </div>
        )}

        {error && (
          <div className="error">
            <p>⚠️ Error: {error instanceof Error ? error.message : 'Failed to load bikes'}</p>
            <button onClick={() => refetch()}>Retry</button>
          </div>
        )}

        {!isLoading && !error && (
          <>
            <div className="bike-count">
              Found {bikes.length} stolen {bikes.length === 1 ? 'bike' : 'bikes'} in Munich area
            </div>
            
            {bikes.length === 0 ? (
              <div className="no-bikes">
                <p>No stolen bikes found in the Munich area.</p>
              </div>
            ) : (
              <div className="bike-list">
                {bikes.map((bike) => (
                  <BikeCard key={bike.id} bike={bike} />
                ))}
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default BikeTheftListPage;

