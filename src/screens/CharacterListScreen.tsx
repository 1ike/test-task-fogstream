import {
  SafeAreaView, FlatList, StyleSheet, StatusBar,
} from 'react-native';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import { RootState, useAppDispatch, useAppSelector } from '../state/store';
import { selectCharacters, requestFetchCharacters, selectorIsCharactersFetching } from '../state/characters';
import CharacterLink from '../components/character/CharacterLink';
import EmptyDataMessage from '../components/EmptyDataMessage';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});


function EmptyData() {
  const emptyDataMessage = `Not a single character has been downloaded. :(

Try to pull down to refresh.`;

  return <EmptyDataMessage text={emptyDataMessage} />;
}


export default function App() {
  const characters = useAppSelector(selectCharacters);
  const IsCharactersFetching = useAppSelector(selectorIsCharactersFetching);

  const dispatch = useAppDispatch();

  const fetchCharacters = () => {
    (dispatch as ThunkDispatch<RootState, void, AnyAction>)(
      requestFetchCharacters(),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={characters}
        renderItem={CharacterLink}
        keyExtractor={(item) => String(item.id)}
        onEndReachedThreshold={0.7}
        // onEndReached={fetchCharacters}
        ListEmptyComponent={EmptyData}
        onRefresh={fetchCharacters}
        refreshing={IsCharactersFetching}
      />
    </SafeAreaView>
  );
}
