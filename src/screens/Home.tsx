import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { useGlobalState } from '../utils/GlobalStateProvider';
import UserTAccountAuthentication from '../components/UserTradingAuth/';
import apiClient from '../utils/ApiClient';

export default function HomeScreen() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { state, setActiveTradingAccount } = useGlobalState();


  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      await apiClient.get('/api/dotty/userTradingAccount/active').then((response) => {
        if(response.status === 200) {
          setActiveTradingAccount(response.data['isActive']);
        }
      }).catch(err => {
        console.warn(err);
      }).finally(() => {
        setIsLoading(false);
      })
    }
    fetchData();
  }, [state.activeTradingAccount]);
  

  return (
    <View style={styles.container}>      
      {isLoading ? 
        <ActivityIndicator size="large" /> : 
        state.activeTradingAccount ? 
        <Text>Dotty!</Text> :
        <UserTAccountAuthentication />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});