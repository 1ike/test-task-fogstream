import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Card } from '@rneui/themed';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PropsWithChildren } from 'react';
import { useNavigation } from '@react-navigation/native';

import Avatar from './Avatar';
import { Character } from '../types';
import type { StackParamList } from '../screens';


const styles = StyleSheet.create({
  cardContainerStyle: {
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


export default function CharacterCardLink({ item: character }: { item: Character }) {
  return (
    <CardLink to={{ routeName: 'Character', params: { character } }}>
      <Card containerStyle={styles.cardContainerStyle}>
        <View style={styles.character}>
          <Avatar character={character} />
          <Card.Title style={styles.title}>{character.name}</Card.Title>
        </View>
      </Card>
    </CardLink>
  );
}
