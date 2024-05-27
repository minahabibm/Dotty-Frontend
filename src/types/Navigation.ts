import { DrawerNavigationProp } from '@react-navigation/drawer';

export type DrawerParamList = {
    Home: undefined;
    Console: undefined;
    Settings: undefined;
    SignIn: undefined;
};
  
export type ScreenNavigationProp = DrawerNavigationProp<DrawerParamList>;