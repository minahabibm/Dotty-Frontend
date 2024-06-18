import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import { StorageInterface } from '../types/Storage';

const isWeb = Platform.OS === 'web';

const Storage: StorageInterface = {
  setItem: async (key: string, value: string): Promise<void> => {
    if (isWeb) {
      localStorage.setItem(key, value);
    } else {
      await AsyncStorage.setItem(key, value);
    }
  },
  
  getItem: async (key: string): Promise<string | null> => {
    if (isWeb) {
      return localStorage.getItem(key);
    } else {
      return await AsyncStorage.getItem(key);
    }
  },

  deleteItem: async (key: string): Promise<void> => {
    if (isWeb) {
      localStorage.removeItem(key);
    } else {
      await AsyncStorage.removeItem(key);
    }
  },

  setSecureItem: async (key: string, value: string): Promise<void> => {
    if (isWeb) {
      console.warn('Secure storage is not supported on the web. Falling back to localStorage.');
      localStorage.setItem(key, value);
    } else {
      await SecureStore.setItemAsync(key, value);
    }
  },

  getSecureItem: async (key: string): Promise<string | null> => {
    if (isWeb) {
      console.warn('Secure storage is not supported on the web. Falling back to localStorage.');
      return localStorage.getItem(key);
    } else {
      return await SecureStore.getItemAsync(key);
    }
  },

  deleteSecureItem: async (key: string): Promise<void> => {
    if (isWeb) {
      console.warn('Secure storage is not supported on the web. Falling back to localStorage.');
       localStorage.removeItem(key);
    } else {
       await SecureStore.deleteItemAsync(key);
    }
  }
};

export default Storage;