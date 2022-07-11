import {
  View, StyleSheet, StyleProp, ViewStyle,
} from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { get } from 'lodash';
import { Text } from '@rneui/themed';

import CharacterCard from '../components/character/CharacterCard';
import type { StackParamList } from '.';


const styles = StyleSheet.create({
  cardHeader: {
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    width: 70,
    fontSize: undefined,
  },
  labelMargin: {
    marginBottom: 10,
  },
  value: {
    marginLeft: 10,
  },
});

interface RowProps {
  label: string, value: string, style?: StyleProp<ViewStyle>,
}

function Row({ label, value, style }: RowProps) {
  return (
    <View style={[styles.row, style && style]}>
      <Text h4 h4Style={styles.label}>
        {label}
        :
      </Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

interface DetailData {
  label: string,
  path: string,
}
const detailsData: DetailData[] = [
  {
    label: 'Gender',
    path: 'gender',
  },
  {
    label: 'Origin',
    path: 'origin.name',
  },
  {
    label: 'Location',
    path: 'location.name',
  },
];


type Props = NativeStackScreenProps<StackParamList, 'Character'>;

export default function App({ route }: Props) {
  const { character } = route.params;

  return (
    <CharacterCard character={character} headerStyle={styles.cardHeader}>
      {detailsData.map((detail, index, arr) => (
        <Row
          label={detail.label}
          value={String(get(character, detail.path))}
          key={detail.label}
          style={index !== arr.length - 1 ? styles.labelMargin : null}
        />
      ))}
    </CharacterCard>
  );
}
