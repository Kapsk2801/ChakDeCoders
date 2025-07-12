import { availabilityOptions } from '../types';

const AvailabilityCheckboxes = ({ 
  selectedAvailability, 
  onAvailabilityChange 
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
        Availability
      </label>
      
      <div className="grid grid-cols-2 gap-3">
        {availabilityOptions.map((option) => (
          <label key={option} className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={selectedAvailability.includes(option)}
              onChange={() => handleCheckboxChange(option)}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{option}</span>
          </label>
        ))}
      </div>
      
      {selectedAvailability.length === 0 && (
        <p className="text-sm text-gray-500">
          Select at least one availability option
        </p>
      )}
    </div>
  );
};

export default AvailabilityCheckboxes; 