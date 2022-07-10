import { TouchableWithoutFeedback, TouchableWithoutFeedbackProps } from 'react-native';
import { Button } from '@rneui/themed';


interface Props {
  onPress: TouchableWithoutFeedbackProps['onPress'],
  selected: boolean,
}

export default function FavouriteButton({ onPress, selected }: Props) {
  return (
    <Button
      onPress={onPress}
      type="clear"
      icon={{
        name: selected ? 'heart' : 'heart-outline',
        type: 'material-community',
        size: 35,
        color: 'crimson',
      }}
      TouchableComponent={TouchableWithoutFeedback}
    />
  );
}
