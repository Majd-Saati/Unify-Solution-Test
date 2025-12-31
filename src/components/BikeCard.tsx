import type { Bike } from '../types/bike';
import { BikeCardHeader } from './BikeCard/BikeCardHeader';
import { BikeCardImage } from './BikeCard/BikeCardImage';
import { BikeCardDescription } from './BikeCard/BikeCardDescription';
import { BikeCardInfo } from './BikeCard/BikeCardInfo';

interface BikeCardProps {
  bike: Bike;
}

export function BikeCard({ bike }: BikeCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <BikeCardHeader title={bike.title} />
      
      <div className="p-5">
        <BikeCardImage imageUrl={bike.large_img || bike.thumb} alt={bike.title || 'Bike image'} />
        
        <BikeCardDescription description={bike.description} />
        <BikeCardInfo bike={bike} />
      </div>
    </div>
  );
}

