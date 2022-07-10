import { TouchableWithoutFeedback, TouchableWithoutFeedbackProps } from 'react-native';
import { Button } from '@rneui/themed';


// const styles = StyleSheet.create({
// });

interface Props {
  onPress: TouchableWithoutFeedbackProps['onPress'],
  selected: boolean,
}

export default function FavouriteButton({ onPress, selected }: Props) {
  return (
    <Button
      onPress={onPress}
      // containerStyle={{
      //   width: 200,
      //   marginHorizontal: 50,
      //   marginVertical: 10,
      // }}
      type="clear"
      icon={{
        name: selected ? 'heart' : 'heart-outline',
        type: 'material-community',
        size: 35,
        color: 'crimson',
      }}
      TouchableComponent={TouchableWithoutFeedback}
    // style={[styles.avatarContainer]}
    />
  );
}
