import { View, StyleSheet, StatusBar } from 'react-native';
import { Card } from '@rneui/themed';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Avatar from '../components/Avatar';
import type { StackParamList } from '.';


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
        <Avatar character={character} />
        <Card.Title style={styles.title}>{character.name}</Card.Title>
      </View>
    </Card>
  );
}
