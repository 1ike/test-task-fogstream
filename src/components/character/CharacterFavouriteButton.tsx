import { useMemo, useCallback } from 'react';

import FavouriteButton from '../FavouriteButton';
import { Character } from '../../types';
import { useAppDispatch, useAppSelector } from '../../state/store';
import { addFavourite, makeSelectorIsFavourite, removeFavourite } from '../../state/favourites';


interface Props {
  character: Character,
}

export default function CharacterFavouriteButton({ character }: Props) {
  const selectorIsFavourite = useMemo(makeSelectorIsFavourite, []);

  const isFavourite = useAppSelector(
    (state) => selectorIsFavourite(state, character),
  );

  const dispatch = useAppDispatch();

  const add = useCallback(() => {
    dispatch(
      addFavourite(character),
    );
  }, [character, dispatch]);

  const remove = useCallback(() => {
    dispatch(
      removeFavourite(character),
    );
  }, [character, dispatch]);

  return (
    <FavouriteButton
      add={add}
      remove={remove}
      selected={isFavourite}
    />
  );
}
