import { Character } from './types';
import type { Page } from './state/characters';


type PageNavigation = string | null;

export interface Info {
  count: number;
  pages: number;
  next: PageNavigation;
  prev: PageNavigation;
}

export interface Data {
  info: Info;
  results: Character[];
}


export const fetchCharacters = (page: Page) => {
  const getParams = new URLSearchParams({ page: String(page) });
  const paramsString = getParams ? `?${getParams.toString()}` : '';

  return fetch(`https://rickandmortyapi.com/api/character${paramsString}`)
    .then((response) => response.json())
    .then((data: Data): Character[] => {
      const charactersData = data.results;
      return charactersData.map(({
        id,
        name,
        status,
        image,
        gender,
        origin,
        location,
      }) => ({
        id,
        name,
        status,
        image,
        gender,
        origin,
        location,
      }));
    });
};
