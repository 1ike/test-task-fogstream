import {
  SafeAreaView, FlatList, View, Image, StyleSheet, StatusBar, TouchableOpacity,
} from 'react-native';
import { Card } from '@rneui/themed';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PropsWithChildren } from 'react';
import { useNavigation } from '@react-navigation/native';

import { RootState, useAppDispatch, useAppSelector } from '../state/store';
import { selectCharacters, requestFetchCharacters } from '../state/characters';
import { Character } from '../types';
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
  link: {
    alignSelf: 'stretch',
    margin: 15,
    marginBottom: 0,
    flexGrow: 1,
  },
  cardContainerStyle: {
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
    borderColor: 'lawngreen',
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


type NavProps = NativeStackNavigationProp<StackParamList, 'Character'>;

interface Params {
  character: Character,
}
interface To {
  routeName: keyof StackParamList,
  params: Params,
}
interface Props {
  to: To,
}


function CardLink({ to, children }: PropsWithChildren<Props>) {
  const { routeName, params: { character } } = to;
  const navigation = useNavigation<NavProps>();

  const onPress = () => {
    navigation.navigate(routeName, { character });
  };

  return (
    <TouchableOpacity onPress={onPress}>
      {children}
    </TouchableOpacity>
  );
}

const renderItem = ({ item: character }: { item: Character }) => (
  <CardLink to={{ routeName: 'Character', params: { character } }}>
    <Card containerStyle={styles.cardContainerStyle}>
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
  </CardLink>
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
