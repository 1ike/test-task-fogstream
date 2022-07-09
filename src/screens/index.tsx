import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CharacterListScreen from './CharacterListScreen';


type StackParamList = {
  TabNavigator: undefined;
};
const Stack = createNativeStackNavigator<StackParamList>();

type TabParamList = {
  Characters: undefined;
};
const Tab = createBottomTabNavigator<TabParamList>();

function TabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Characters"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="Characters" component={CharacterListScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
