
import React from 'react';
import Button from './Button';

interface DogCardProps {
  breed: string;
  imageUrl: string;
  onShowAnother: () => void;
  isLoading: boolean;
}

const DogCard: React.FC<DogCardProps> = ({ breed, imageUrl, onShowAnother, isLoading }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-lg p-6 flex flex-col items-center gap-4 animate-fade-in">
      <h2 className="text-3xl font-bold text-gray-800 capitalize">
        {breed}
      </h2>
      <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-lg">
        {isLoading && (
          <div className="absolute inset-0 bg-gray-200 bg-opacity-75 flex items-center justify-center z-10">
            <div className="w-12 h-12 border-4 border-purple-400 border-t-purple-600 rounded-full animate-spin"></div>
          </div>
        )}
        <img
          src={imageUrl}
          alt={`A random ${breed}`}
          className={`w-full h-full object-cover transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}
        />
      </div>
      <Button onClick={onShowAnother} disabled={isLoading} >
        {isLoading ? 'Loading...' : 'Show Another'}
      </Button>
    </div>
  );
};

export default DogCard;
