import { TouchableWithoutFeedback, TouchableWithoutFeedbackProps } from 'react-native';
import { Button } from '@rneui/themed';


interface Props {
  add: TouchableWithoutFeedbackProps['onPress'],
  remove: TouchableWithoutFeedbackProps['onPress'],
  selected: boolean,
}

export default function FavouriteButton({ add, remove, selected }: Props) {
  return (
    <Button
      onPress={selected ? remove : add}
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
