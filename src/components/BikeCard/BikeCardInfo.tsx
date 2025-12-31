import { formatDate } from '../../utils/dateFormatter';
import type { Bike } from '../../types/bike';

interface BikeCardInfoProps {
  bike: Bike;
}

export function BikeCardInfo({ bike }: BikeCardInfoProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <strong className="text-gray-900 font-semibold text-sm">Date of Theft:</strong>
        <span className="text-gray-700 text-sm">{formatDate(bike.date_stolen)}</span>
      </div>

      <div className="flex flex-col gap-1">
        <strong className="text-gray-900 font-semibold text-sm">Date Reported:</strong>
        <span className="text-gray-500 text-sm italic">Not available in API response</span>
      </div>

      {bike.stolen_location ? (
        <div className="flex flex-col gap-1">
          <strong className="text-gray-900 font-semibold text-sm">Location of Theft:</strong>
          <span className="text-gray-700 text-sm">{bike.stolen_location}</span>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <strong className="text-gray-900 font-semibold text-sm">Location of Theft:</strong>
          <span className="text-gray-500 text-sm italic">Location not available</span>
        </div>
      )}
    </div>
  );
}

