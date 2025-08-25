
import React, { useState, useEffect, useCallback } from 'react';
import { fetchAllBreeds, fetchRandomImageForBreed } from './services/dogApi';
import Header from './components/Header';
import BreedSelector from './components/BreedSelector';
import Button from './components/Button';
import DogCard from './components/DogCard';
import LoadingSpinner from './components/LoadingSpinner';
import ErrorMessage from './components/ErrorMessage';

const App: React.FC = () => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isImageLoading, setIsImageLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadBreeds = async () => {
      try {
        setError(null);
        setIsLoading(true);
        const breedList = await fetchAllBreeds();
        setBreeds(breedList);
        if (breedList.length > 0) {
          setSelectedBreed(breedList[0]);
        }
      } catch (err) {
        setError('Failed to fetch dog breeds. Please try refreshing the page.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadBreeds();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchDogImage = useCallback(async () => {
    if (!selectedBreed) {
      setError('Please select a breed first.');
      return;
    }
    setError(null);
    setIsImageLoading(true);
    try {
      const url = await fetchRandomImageForBreed(selectedBreed);
      setImageUrl(url);
    } catch (err) {
      setError(`Failed to fetch an image for ${selectedBreed}. Please try again.`);
      console.error(err);
    } finally {
      setIsImageLoading(false);
    }
  }, [selectedBreed]);

  const handleShowDog = () => {
    setImageUrl(''); // Clear previous image before fetching a new breed
    fetchDogImage();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 flex flex-col items-center p-4 sm:p-8 font-sans">
      <Header />
      <main className="w-full max-w-lg mx-auto flex flex-col items-center">
        <div className="bg-white/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg w-full mb-8">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <BreedSelector
              breeds={breeds}
              value={selectedBreed}
              onChange={(e) => setSelectedBreed(e.target.value)}
              disabled={isLoading || breeds.length === 0}
            />
            <Button
              onClick={handleShowDog}
              disabled={isLoading || isImageLoading || !selectedBreed}
            >
              {isImageLoading && !imageUrl ? 'Fetching...' : 'Show Dog'}
            </Button>
          </div>
        </div>

        {isLoading && <LoadingSpinner />}
        {error && !isLoading && <ErrorMessage message={error} />}

        {!isLoading && imageUrl && (
          <DogCard
            breed={selectedBreed}
            imageUrl={imageUrl}
            onShowAnother={fetchDogImage}
            isLoading={isImageLoading}
          />
        )}
      </main>
    </div>
  );
};

export default App;
