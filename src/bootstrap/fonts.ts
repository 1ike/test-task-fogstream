/* eslint-disable import/no-extraneous-dependencies */
import * as Font from 'expo-font';
import Entypo from '@expo/vector-icons/Entypo';
/* eslint-enable import/no-extraneous-dependencies */

export default async () => {
  await Font.loadAsync(Entypo.font);
};
