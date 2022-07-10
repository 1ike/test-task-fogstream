import {
  View, Image, StyleSheet, StatusBar,
} from 'react-native';
import { Card } from '@rneui/themed';


import { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { StackParamList } from '.';


const avatarContainerBorderWidth = 5;
const avatarDimension = 50;
const avatarBorderRadius = avatarDimension / 2;
const avatarContainerDimension = avatarDimension + 2 * avatarContainerBorderWidth;
const avatarContainerBorderRadius = avatarContainerDimension / 2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  containerStyle: {
    borderRadius: 5,
  },
  character: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: avatarContainerDimension,
    height: avatarContainerDimension,
    borderWidth: avatarContainerBorderWidth,
    borderRadius: avatarContainerBorderRadius,
    borderColor: 'green',
  },
  avatarDeadContainer: {
    borderColor: 'black',
  },
  avatar: {
    width: avatarDimension,
    height: avatarDimension,
    borderRadius: avatarBorderRadius,
  },
  title: {
    marginBottom: 0,
    marginLeft: 10,
  },
});

type Props = NativeStackScreenProps<StackParamList, 'Character'>;

export default function App({ route }: Props) {
  const { character } = route.params;

  return (
    <Card containerStyle={styles.containerStyle}>
      <View style={styles.character}>
        <View style={[styles.avatarContainer, character.status !== 'Alive' && styles.avatarDeadContainer]}>
          <Image
            style={styles.avatar}
            source={{ uri: character.image }}
          />
        </View>
        <Card.Title style={styles.title}>{character.name}</Card.Title>
      </View>
    </Card>
  );
}
