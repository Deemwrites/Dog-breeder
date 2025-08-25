
export interface BreedListApiResponse {
  message: {
    [breed: string]: string[];
  };
  status: string;
}

export interface RandomImageApiResponse {
  message: string;
  status: string;
}
