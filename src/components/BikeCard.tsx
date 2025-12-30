import { useState } from 'react';
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
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
      {/* Case Title */}
      <div className="flex justify-between items-start p-5 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
        <h3 className="m-0 text-xl font-semibold flex-1 leading-tight">{bike.title || 'Untitled Case'}</h3>
        <span className="px-3 py-1.5 rounded-md text-xs font-bold uppercase tracking-wider ml-4 whitespace-nowrap bg-white/25 text-white border border-white/30">
          STOLEN
        </span>
      </div>
      
      <div className="p-5">
        {/* Picture of the bike - Unified dimensions */}
        <div className="w-full mb-4 rounded-lg overflow-hidden bg-gray-100 h-64 flex items-center justify-center">
          {bike.large_img || bike.thumb ? (
            <img 
              src={bike.large_img || bike.thumb || ''} 
              alt={bike.title || 'Bike image'} 
              className="w-full h-full object-cover"
            />
          ) : (
            <p className="text-gray-400 text-sm">No image available</p>
          )}
        </div>
        
        <div className="flex flex-col gap-4">
          {/* Case Description - Toggle */}
          <div className="pb-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <strong className="text-gray-900 font-semibold text-base">Case Description:</strong>
              {bike.description && (
                <button
                  onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                  className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1 transition-colors"
                  aria-label={isDescriptionExpanded ? 'Collapse description' : 'Expand description'}
                >
                  {isDescriptionExpanded ? (
                    <>
                      <span>Hide</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                      </svg>
                    </>
                  ) : (
                    <>
                      <span>Show</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </>
                  )}
                </button>
              )}
            </div>
            {bike.description ? (
              <>
                {isDescriptionExpanded ? (
                  <p className="m-0 text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                    {bike.description}
                  </p>
                ) : (
                  <p className="m-0 text-gray-500 text-sm italic">Click "Show" to view description</p>
                )}
              </>
            ) : (
              <p className="m-0 text-gray-500 text-sm italic">No description available</p>
            )}
          </div>
          
          {/* Date of the theft */}
          <div className="flex flex-col gap-1">
            <strong className="text-gray-900 font-semibold text-sm">Date of Theft:</strong>
            <span className="text-gray-700 text-sm">{formatDate(bike.date_stolen)}</span>
          </div>
          
          {/* Date of when the case was reported */}
          <div className="flex flex-col gap-1">
            <strong className="text-gray-900 font-semibold text-sm">Date Reported:</strong>
            <span className="text-gray-500 text-sm italic">Not available in API response</span>
          </div>
          
          {/* Location of the theft */}
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
      </div>
    </div>
  );
}

