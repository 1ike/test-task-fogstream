import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CharacterListScreen from './CharacterListScreen';
import FavouriteListScreen from './FavouriteListScreen';
import CharacterScreen from './CharacterScreen';
import { Character as CharacterType } from '../types';


export type StackParamList = {
  TabNavigator: undefined;
  Character: { character: CharacterType };
};
const Stack = createNativeStackNavigator<StackParamList>();

export type TabParamList = {
  Characters: undefined;
  Favourites: undefined;
};
const Tab = createBottomTabNavigator<TabParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Characters"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Characters" component={CharacterListScreen} />
      <Tab.Screen name="Favourites" component={FavouriteListScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen name="Character" component={CharacterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
