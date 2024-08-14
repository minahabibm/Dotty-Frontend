import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from '../components/CustomDrawer';
import { useAuthContext } from '../utils/AuthProvider';
import UserProvider from '../utils/UserProvider';
import SplashScreen from '../screens/SplashScreen';
import UserSignIn from  '../screens/UserSignIn';
import HomeScreen from '../screens/Home';
import ConsoleScreen from '../screens/Console';
import SettingsScreen from '../screens/Settings';


// const Stack = createNativeStackNavigator();
const Stack = createDrawerNavigator();

function NavigationStack() {
  const {state, restoreUser } = useAuthContext();
  
  useEffect(() => {
    UserProvider.getUser().then(
      async (value: any) => {
        // await new Promise(resolve => setTimeout(resolve, 2000));
        restoreUser(value);
      }
    ).catch(
      (e) => { console.warn(e) }
    )
  }, []);


  return (
    <Stack.Navigator
      drawerContent={(props) =>   <CustomDrawer {...props}  user={state.user}/>}
      initialRouteName="Home"
    >
      {!state.user ? (
        <Stack.Screen 
          name="SignIn" 
          component={state.isLoading ? SplashScreen :  UserSignIn} 
          options={{ 
            // drawerType: 'back',
            swipeEnabled: false,
            headerShown: false,
            // animationTypeForReplace: state.isSignout ? 'pop' : 'push',
          }}
        />
      ) : (
          <>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Console" component={ConsoleScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
          </>
      )}
    </Stack.Navigator>
  );
}

export default NavigationStack;