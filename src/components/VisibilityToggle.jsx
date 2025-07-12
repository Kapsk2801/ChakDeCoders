const VisibilityToggle = ({ isPublic, onToggle }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          Profile Visibility
        </label>
        <p className="text-sm text-gray-500">
          {isPublic ? 'Your profile is visible to everyone' : 'Your profile is private'}
        </p>
      </div>
      
      <button
        type="button"
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          isPublic ? 'bg-blue-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            isPublic ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );
};

export default VisibilityToggle; 