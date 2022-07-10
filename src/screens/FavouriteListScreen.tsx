import {
  SafeAreaView, FlatList, StyleSheet, StatusBar,
} from 'react-native';

import { useAppSelector } from '../state/store';
import { selectFavourites } from '../state/favourites';
import CharacterCardLink from '../components/CharacterCardLink';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});


export default function App() {
  const favourites = useAppSelector(selectFavourites);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={favourites}
        renderItem={CharacterCardLink}
        keyExtractor={(item) => String(item.id)}
      />
    </SafeAreaView>
  );
}
