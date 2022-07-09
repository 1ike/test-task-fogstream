import { Text, View } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import Entypo from '@expo/vector-icons/Entypo';

import { useAppSelector } from '../state/store';
import { selectCharacters } from '../state/characters';


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

export default function App() {
  const result = useAppSelector(selectCharacters);
  console.log('result = ', result);

  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
    >
      <Text>SplashScreen Demo! 👋</Text>
      <Entypo name="rocket" size={30} />
    </View>
  );
}
