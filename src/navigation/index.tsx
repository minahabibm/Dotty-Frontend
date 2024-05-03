import 'react-native-gesture-handler';
import * as React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../components/CustomDrawer';
import HomeScreen from '../screens/Home';
import ConsoleScreen from '../screens/Console';
import SettingsScreen from '../screens/Settings';

// const Stack = createNativeStackNavigator();
const Stack = createDrawerNavigator();

function NavigationStack() {
  return (
      <Stack.Navigator 
        // drawerContent={(props) => <CustomDrawer {...props} />}
        initialRouteName="Home"
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Console" component={ConsoleScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
  );
}

export default NavigationStack;