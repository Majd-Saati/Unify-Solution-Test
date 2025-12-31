import { useState } from 'react';
import { FaChevronUp, FaChevronDown } from 'react-icons/fa';

interface BikeCardDescriptionProps {
  description: string | null;
}

export function BikeCardDescription({ description }: BikeCardDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!description) {
    return (
      <div className="pb-4 border-b border-gray-200">
        <strong className="block mb-2 text-gray-900 font-semibold text-base">Case Description:</strong>
        <p className="m-0 text-gray-500 text-sm italic">No description available</p>
      </div>
    );
  }

  return (
    <div className="pb-4 border-b border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <strong className="text-gray-900 font-semibold text-base">Case Description:</strong>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-indigo-600 hover:text-indigo-700 text-sm font-medium flex items-center gap-1 transition-colors"
          aria-label={isExpanded ? 'Collapse description' : 'Expand description'}
        >
          {isExpanded ? (
            <>
              <span>Hide</span>
              <FaChevronUp className="w-4 h-4" />
            </>
          ) : (
            <>
              <span>Show</span>
              <FaChevronDown className="w-4 h-4" />
            </>
          )}
        </button>
      </div>
      {isExpanded ? (
        <p className="m-0 text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">{description}</p>
      ) : (
        <p className="m-0 text-gray-500 text-sm italic">Click "Show" to view description</p>
      )}
    </div>
  );
}

