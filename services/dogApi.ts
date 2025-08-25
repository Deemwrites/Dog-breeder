
import { BreedListApiResponse, RandomImageApiResponse } from '../types';

const API_BASE_URL = 'https://dog.ceo/api';

export const fetchAllBreeds = async (): Promise<string[]> => {
  const response = await fetch(`${API_BASE_URL}/breeds/list/all`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data: BreedListApiResponse = await response.json();
  
  if (data.status !== 'success') {
    throw new Error('API returned an error status');
  }

  const breeds = data.message;
  const breedList: string[] = [];
  for (const breed in breeds) {
    if (breeds[breed].length === 0) {
      breedList.push(breed);
    } else {
      for (const subBreed of breeds[breed]) {
        breedList.push(`${breed} ${subBreed}`);
      }
    }
  }
  return breedList.sort();
};

export const fetchRandomImageForBreed = async (breed: string): Promise<string> => {
  const breedPath = breed.split(' ').join('/');
  const response = await fetch(`${API_BASE_URL}/breed/${breedPath}/images/random`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  const data: RandomImageApiResponse = await response.json();

  if (data.status !== 'success') {
    throw new Error('API returned an error status');
  }
  
  return data.message;
};
