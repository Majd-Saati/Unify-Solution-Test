import type { Bike } from '../types/bike';

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
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex justify-between items-start p-5 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
        <h3 className="m-0 text-xl font-semibold flex-1 leading-tight">{bike.title}</h3>
        <span className="px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider ml-4 whitespace-nowrap bg-white/25 text-white border border-white/30">
          STOLEN
        </span>
      </div>
      
      <div className="p-5">
        {bike.thumb && (
          <div className="w-full mb-4 rounded-lg overflow-hidden bg-gray-100">
            <img src={bike.thumb} alt={bike.title} className="w-full h-auto block object-cover" />
          </div>
        )}
        
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2 text-[0.95rem] leading-6 text-gray-800">
            <strong className="text-gray-900 font-semibold min-w-[100px]">Manufacturer:</strong> {bike.manufacturer_name}
          </div>
          
          {bike.frame_model && (
            <div className="flex flex-wrap gap-2 text-[0.95rem] leading-6 text-gray-800">
              <strong className="text-gray-900 font-semibold min-w-[100px]">Model:</strong> {bike.frame_model}
            </div>
          )}
          
          {bike.year && (
            <div className="flex flex-wrap gap-2 text-[0.95rem] leading-6 text-gray-800">
              <strong className="text-gray-900 font-semibold min-w-[100px]">Year:</strong> {bike.year}
            </div>
          )}
          
          <div className="flex flex-wrap gap-2 text-[0.95rem] leading-6 text-gray-800">
            <strong className="text-gray-900 font-semibold min-w-[100px]">Colors:</strong> {bike.frame_colors.join(', ')}
          </div>
          
          {bike.serial && bike.serial !== 'Unknown' && bike.serial !== 'Hidden' && (
            <div className="flex flex-wrap gap-2 text-[0.95rem] leading-6 text-gray-800">
              <strong className="text-gray-900 font-semibold min-w-[100px]">Serial:</strong> {bike.serial}
            </div>
          )}
          
          <div className="flex flex-wrap gap-2 text-[0.95rem] leading-6 text-gray-800">
            <strong className="text-gray-900 font-semibold min-w-[100px]">Date Stolen:</strong> {formatDate(bike.date_stolen)}
          </div>
          
          {bike.stolen_location && (
            <div className="flex flex-wrap gap-2 text-[0.95rem] leading-6 text-gray-800">
              <strong className="text-gray-900 font-semibold min-w-[100px]">Location:</strong> {bike.stolen_location}
            </div>
          )}
          
          {bike.description && (
            <div className="mt-2 pt-4 border-t border-gray-200">
              <strong className="block mb-2 text-gray-900 font-semibold">Description:</strong>
              <p className="m-0 text-gray-600 text-sm leading-relaxed whitespace-pre-wrap">{bike.description}</p>
            </div>
          )}
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <a 
              href={bike.url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center text-indigo-600 no-underline font-medium text-[0.95rem] transition-colors hover:text-indigo-700 hover:underline"
            >
              View on Bike Index →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

