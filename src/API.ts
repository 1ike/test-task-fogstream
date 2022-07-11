// eslint-disable-next-line import/no-extraneous-dependencies
import Constants from 'expo-constants';

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


const API_URL = (Constants.manifest?.extra?.API_URL as string) || 'https://rickandmortyapi.com/api';

export const fetchCharacters = (page: Page) => {
  const getParams = new URLSearchParams({ page: String(page) });
  const paramsString = getParams ? `?${getParams.toString()}` : '';

  return fetch(`${API_URL}/character${paramsString}`)
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
