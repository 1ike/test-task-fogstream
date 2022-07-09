import {
  SafeAreaView, FlatList, View, Image, StyleSheet, StatusBar,
} from 'react-native';
import { Card } from '@rneui/themed';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import { RootState, useAppDispatch, useAppSelector } from '../state/store';
import { selectCharacters, requestFetchCharacters } from '../state/characters';
import { Character } from '../types';


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


const renderItem = ({ item: character }: { item: Character }) => (
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


export default function App() {
  const result = useAppSelector(selectCharacters);

  const dispatch = useAppDispatch();

  const onEndReached = () => {
    (dispatch as ThunkDispatch<RootState, void, AnyAction>)(
      requestFetchCharacters(),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={result}
        renderItem={renderItem}
        keyExtractor={(item) => String(item.id)}
        onEndReachedThreshold={0.7}
        onEndReached={onEndReached}
      />
    </SafeAreaView>
  );
}
