import { TouchableOpacity } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { PropsWithChildren } from 'react';
import { useNavigation } from '@react-navigation/native';

import CharacterCard from './CharacterCard';
import Routes from '../../navigation/routes';
import { Character } from '../../types';
import type { StackParamList } from '../../screens';


type NavProps = NativeStackNavigationProp<StackParamList, Routes.Character>;

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


export default function CharacterLink({ item: character }: { item: Character }) {
  return (
    <CardLink to={{ routeName: Routes.Character, params: { character } }}>
      <CharacterCard character={character} />
    </CardLink>
  );
}
