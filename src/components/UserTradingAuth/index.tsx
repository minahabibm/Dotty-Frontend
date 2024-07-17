import React from 'react';
import { View, StyleSheet} from 'react-native';
import UserTAccountSchwAuth from './UserTAccountSchw';
import UserTAccountAlpaca from './UserTAccountAlpaca';
import { ModalProvider } from '../../utils/ModalProvider';

function UserTAccountAuthentication() {
  return (
    <View>
      <UserTAccountSchwAuth />
      <ModalProvider>
        <UserTAccountAlpaca />
      </ModalProvider>
    </View>
  );
}

export default UserTAccountAuthentication;
