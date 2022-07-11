import { View, StyleSheet } from 'react-native';
import { Image } from 'react-native-expo-image-cache';

import { Character } from '../../types';


const avatarContainerBorderWidth = 5;
const avatarDimension = 50;
const avatarBorderRadius = avatarDimension / 2;
const avatarContainerDimension = avatarDimension + 2 * avatarContainerBorderWidth;
const avatarContainerBorderRadius = avatarContainerDimension / 2;

const styles = StyleSheet.create({
  avatarContainer: {
    width: avatarContainerDimension,
    height: avatarContainerDimension,
    borderWidth: avatarContainerBorderWidth,
    borderRadius: avatarContainerBorderRadius,
    borderColor: 'palegreen',
  },
  avatarDeadContainer: {
    borderColor: 'black',
  },
  avatar: {
    width: avatarDimension,
    height: avatarDimension,
    borderRadius: avatarBorderRadius,
  },
});


export default function Avatar({ character }: { character: Character }) {
  return (
    <View style={[styles.avatarContainer, character.status !== 'Alive' && styles.avatarDeadContainer]}>
      <Image
        style={styles.avatar}
        uri={character.image}
      />
    </View>
  );
}
