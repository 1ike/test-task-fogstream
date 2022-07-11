import { StyleSheet, View } from 'react-native';
import { Text } from '@rneui/themed';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});

export default function EmptyDataMessage({ text }: { text: string }) {
  return (
    <View style={styles.container}>
      <Text>{text}</Text>
    </View>
  );
}
