import { AlertCircle } from 'lucide-react';
import { availabilityOptions } from '../types';

const AvailabilityCheckboxes = ({ 
  selectedAvailability, 
  onAvailabilityChange,
  error = null
}) => {
  const handleCheckboxChange = (availability) => {
    if (selectedAvailability.includes(availability)) {
      // Remove if already selected
      onAvailabilityChange(selectedAvailability.filter(item => item !== availability));
    } else {
      // Add if not selected
      onAvailabilityChange([...selectedAvailability, availability]);
    }
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-700">
        Availability *
      </label>
      
      <div className="grid grid-cols-2 gap-3">
        {availabilityOptions.map((option) => (
          <label key={option} className="flex items-center space-x-2 cursor-pointer p-2 rounded-lg hover:bg-gray-50 transition-colors">
            <input
              type="checkbox"
              checked={selectedAvailability.includes(option)}
              onChange={() => handleCheckboxChange(option)}
              className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
            />
            <span className="text-sm text-gray-700">{option}</span>
          </label>
        ))}
      </div>
      
      {selectedAvailability.length === 0 && !error && (
        <p className="text-sm text-gray-500">
          Select at least one availability option
        </p>
      )}

      {error && (
        <p className="text-red-500 text-sm flex items-center">
          <AlertCircle className="w-4 h-4 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};

export default AvailabilityCheckboxes; 