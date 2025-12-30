import type { Bike } from '../types/bike';
import './BikeCard.css';

interface BikeCardProps {
  bike: Bike;
}

function formatDate(timestamp: number | null): string {
  if (!timestamp) return 'Date unknown';
  const date = new Date(timestamp * 1000);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function BikeCard({ bike }: BikeCardProps) {
  return (
    <div className="bike-card">
      <div className="bike-card-header">
        <h3>{bike.title}</h3>
        <span className="bike-status stolen">STOLEN</span>
      </div>
      
      <div className="bike-card-content">
        {bike.thumb && (
          <div className="bike-image">
            <img src={bike.thumb} alt={bike.title} />
          </div>
        )}
        
        <div className="bike-details">
          <div className="bike-info-row">
            <strong>Manufacturer:</strong> {bike.manufacturer_name}
          </div>
          
          {bike.frame_model && (
            <div className="bike-info-row">
              <strong>Model:</strong> {bike.frame_model}
            </div>
          )}
          
          {bike.year && (
            <div className="bike-info-row">
              <strong>Year:</strong> {bike.year}
            </div>
          )}
          
          <div className="bike-info-row">
            <strong>Colors:</strong> {bike.frame_colors.join(', ')}
          </div>
          
          {bike.serial && bike.serial !== 'Unknown' && bike.serial !== 'Hidden' && (
            <div className="bike-info-row">
              <strong>Serial:</strong> {bike.serial}
            </div>
          )}
          
          <div className="bike-info-row">
            <strong>Date Stolen:</strong> {formatDate(bike.date_stolen)}
          </div>
          
          {bike.stolen_location && (
            <div className="bike-info-row">
              <strong>Location:</strong> {bike.stolen_location}
            </div>
          )}
          
          {bike.description && (
            <div className="bike-description">
              <strong>Description:</strong>
              <p>{bike.description}</p>
            </div>
          )}
          
          <div className="bike-card-footer">
            <a 
              href={bike.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="bike-link"
            >
              View on Bike Index →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

