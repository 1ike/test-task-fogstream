export interface Origin {
  name: string;
  url: string;
}

export interface Location {
  name: string;
  url: string;
}

export interface Character {
  id: number;
  name: string;
  status: string;
  image: string;
  gender: string;
  origin: Origin;
  location: Location;
}
