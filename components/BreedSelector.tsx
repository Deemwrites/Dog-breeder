
import React from 'react';

interface BreedSelectorProps {
  breeds: string[];
  value: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled: boolean;
}

const BreedSelector: React.FC<BreedSelectorProps> = ({ breeds, value, onChange, disabled }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      className="w-full flex-grow p-3 border-2 border-gray-300 rounded-lg text-lg text-gray-700 bg-white focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-200"
    >
      {breeds.map((breed) => (
        <option key={breed} value={breed} className="capitalize">
          {breed.charAt(0).toUpperCase() + breed.slice(1)}
        </option>
      ))}
    </select>
  );
};

export default BreedSelector;
