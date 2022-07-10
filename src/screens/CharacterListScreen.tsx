import {
  SafeAreaView, FlatList, StyleSheet, StatusBar,
} from 'react-native';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import { RootState, useAppDispatch, useAppSelector } from '../state/store';
import { selectCharacters, requestFetchCharacters } from '../state/characters';
import CharacterCardLink from '../components/CharacterCardLink';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});


export default function App() {
  const characters = useAppSelector(selectCharacters);

  const dispatch = useAppDispatch();

  const onEndReached = () => {
    (dispatch as ThunkDispatch<RootState, void, AnyAction>)(
      requestFetchCharacters(),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={characters}
        renderItem={CharacterCardLink}
        keyExtractor={(item) => String(item.id)}
        onEndReachedThreshold={0.7}
        onEndReached={onEndReached}
      />
    </SafeAreaView>
  );
}
