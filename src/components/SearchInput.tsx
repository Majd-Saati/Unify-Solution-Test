import { useState, useEffect, useCallback, useRef, type ChangeEvent, type FormEvent } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import { useDebounce } from '../hooks/useDebounce';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  isLoading?: boolean;
}

export function SearchInput({
  value,
  onChange,
  placeholder = 'Search by case title...',
  debounceMs = 400,
  isLoading = false,
}: SearchInputProps) {
  const [inputValue, setInputValue] = useState(value);
  const debouncedValue = useDebounce(inputValue, debounceMs);
  const prevExternalValue = useRef(value);
  const isClearingRef = useRef(false);

  // Sync external value changes only when it's a genuine external navigation
  // (e.g., browser back/forward, direct URL change)
  useEffect(() => {
    // Only sync if the external value actually changed (not just a re-render)
    if (value !== prevExternalValue.current) {
      prevExternalValue.current = value;
      setInputValue(value);
      // Reset clearing flag when external value changes
      isClearingRef.current = false;
    }
  }, [value]);

  // Trigger onChange when debounced value differs from external value
  useEffect(() => {
    // Skip if we just cleared - the immediate onChange('') call already handled it
    if (isClearingRef.current) {
      return;
    }
    
    if (debouncedValue !== value) {
      onChange(debouncedValue);
    }
  }, [debouncedValue, onChange, value]);

  const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    isClearingRef.current = false; // Reset clearing flag when user types
    setInputValue(e.target.value);
  }, []);

  const handleClear = useCallback(() => {
    // Set clearing flag to prevent debounce effect from interfering
    isClearingRef.current = true;
    // Immediately clear both local state and trigger onChange
    setInputValue('');
    prevExternalValue.current = '';
    onChange('');
    
    // Reset clearing flag after debounce delay to allow normal operation
    setTimeout(() => {
      isClearingRef.current = false;
    }, debounceMs + 100);
  }, [onChange, debounceMs]);

  const handleSubmit = useCallback((e: FormEvent) => {
    e.preventDefault();
    if (inputValue !== value) {
      onChange(inputValue);
    }
  }, [inputValue, onChange, value]);

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xl">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <FiSearch 
            className={`h-5 w-5 transition-colors duration-200 ${
              isLoading ? 'text-amber-500 animate-pulse' : 'text-gray-400'
            }`} 
          />
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="
            w-full pl-12 pr-12 py-3.5
            text-gray-900 placeholder-gray-400
            bg-white border-2 border-gray-200
            rounded-xl shadow-sm
            transition-all duration-200
            focus:outline-none focus:border-amber-400 focus:ring-4 focus:ring-amber-100
            hover:border-gray-300
          "
          aria-label="Search bike theft cases"
        />
        {inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="
              absolute inset-y-0 right-0 pr-4 flex items-center
              text-gray-400 hover:text-gray-600
              transition-colors duration-200
            "
            aria-label="Clear search"
          >
            <FiX className="h-5 w-5" />
          </button>
        )}
      </div>
      {inputValue && inputValue !== value && (
        <div className="absolute -bottom-6 left-0 text-xs text-gray-500">
          Press Enter to search or wait...
        </div>
      )}
    </form>
  );
}

