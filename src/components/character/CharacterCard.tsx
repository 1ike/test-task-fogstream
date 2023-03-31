import {
  View, StyleSheet, StyleProp, ViewStyle,
} from 'react-native';
import { Card } from '@rneui/themed';
import { PropsWithChildren } from 'react';

import Avatar from './Avatar';
import CharacterFavouriteButton from './CharacterFavouriteButton';
import { Character } from '../../types';


const styles = StyleSheet.create({
  cardContainerStyle: {
    borderRadius: 5,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  character: {
    flexDirection: 'row',
    flexShrink: 1,
    alignItems: 'center',
  },
  title: {
    flexShrink: 1,
    textAlign: 'left',
    marginBottom: 0,
    marginLeft: 10,
  },
});

interface Props {
  character: Character,
  headerStyle?: StyleProp<ViewStyle>,
}

export default function CharacterCard(
  { character, children, headerStyle }: PropsWithChildren<Props>,
) {
  return (
    <Card containerStyle={styles.cardContainerStyle}>
      <View style={[styles.cardHeader, headerStyle]}>
        <View style={styles.character}>
          <Avatar character={character} />
          <Card.Title style={styles.title}>{character.name}</Card.Title>
        </View>
        <CharacterFavouriteButton character={character} />
      </View>
      {children}
    </Card>
  );
}
