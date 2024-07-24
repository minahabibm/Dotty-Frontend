import React, {useState} from 'react';
import {View, Alert, Modal, Text, Pressable, TextInput, Platform, StyleSheet} from 'react-native';
import Checkbox from 'expo-checkbox';
import { useGlobalState } from '../../utils/GlobalStateProvider';
import { useModal } from '../../utils/ModalProvider';
import Logo from '../../assets/LogoAlpaca';
import apiClient from '../../utils/ApiClient';
import { ALPACA_AUTHORIZATION_ENDPOINT as authorization_endpoint } from '@env';
  

const ModalButton  = (props: { title: string; onPress: () => void;}) => { 
    return(
        <Pressable
            style={({ pressed }) => [
                pressed ? { opacity: 0.50 } : {opacity: 1},
                styles.button
            ]}
            onPress={() => props.onPress()}
        >
            <Text style={styles.textStyle}>{props.title}</Text>
        </Pressable>
    )
}

// TODO redirect user to sign in.
const userAlpacaModal = () => {
    const { state, setActiveTradingAccount } = useGlobalState();
    const { isModalOpen, closeModal } = useModal();
    const [apiKey , setApiKey] = useState("");
    const [apiSecretKey , setApiSecretKey] = useState("");
    const [isChecked, setChecked] = useState(false);
    const [errorMessage , setErrorMessage] = useState<String | null>(null);


    const isValidForm = () => {
        if(apiKey.length ===  0 || apiSecretKey.length === 0) {
            setErrorMessage("Alpaca's api account Key and secret are required.");
            return false;
        } else {
            setErrorMessage(null);
            return true;
        }
    }

    const handleSaveButton = async () => {
        
        if(isValidForm()) {
            const data = {
                key: apiKey,
                secret: apiSecretKey,
                paperAccount: isChecked
            };
            await apiClient.post(authorization_endpoint, data)
            .then(response => {
                if(response.status === 200) {
                    console.log(response.data);
                    setApiKey("");
                    setApiSecretKey("");
                    closeModal();
                    setActiveTradingAccount(!state.activeTradingAccount);
                }
            }).catch(error => {
                if (error.response) {           // The server responded with a status code outside the 2xx range
                    console.log('Error response:', error.response.status);
                } else if (error.request) {     // The request was made but no response was received
                    console.log('Error request:', error.request.status);
                } else {                        // Something happened in setting up the request that triggered an error
                    console.log('Error message:', error.message);
                }
            });
            
        }
       
    };

    const handleCancelButton = async () => {
        setApiKey("");
        setApiSecretKey("");
        setChecked(false);
        setErrorMessage(null);
        closeModal(); 
    };

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={isModalOpen}
            onRequestClose={() => {
                Alert.alert('Modal has been closed.');
            }}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.modalHeader}>
                        <Logo />
                        <Text style={styles.modalTitleText}>Alpaca</Text>
                    </View>
                    
                    
                    <View>
                        <TextInput style={styles.textInput} placeholder="YOUR_API_KEY_ID" placeholderTextColor="#71717a" onChangeText={setApiKey} />    
                        <TextInput style={styles.textInput} placeholder="YOUR_API_SECRET_KEY" placeholderTextColor="#71717a" onChangeText={setApiSecretKey} />
                        <View style={styles.checkboxView}>
                            <Checkbox value={isChecked} onValueChange={setChecked}  color={isChecked ? '#4630EB' : undefined} />
                            <Text> Paper trading account </Text>
                        </View>
                    </View>


                    <View style={styles.modalButtonView}>
                        <ModalButton title ="save" onPress={handleSaveButton}></ModalButton>  
                        <ModalButton title ="cancel" onPress={handleCancelButton}></ModalButton>
                        {errorMessage &&  <Text  style={styles.errorTextStyle}>{errorMessage}</Text>}
                    </View>
                </View>
            </View>
        </Modal>
    );
  };
  
  const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        width: Platform.OS == 'web' ? '25%' : '70%',
        height: '50%',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'stretch',
        backgroundColor: "#FFD746",
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    modalHeader: {
        alignItems: 'center'
    },
    modalTitleText: {
        fontWeight: 'bold'
    },
    
    textInput: {
        borderWidth: 0.2,
        borderRadius: 10,
        borderColor:  "#71717a",
        margin: 5,
        padding: 10,
        backgroundColor: "#ffffff"
    },

    modalButtonView: {
        marginHorizontal: 45
    },
    button: {
      borderRadius: 20,
      padding: 10,
      margin: 7.5,
      elevation: 2,
      backgroundColor: '#384248',
    },

    textStyle: {
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    checkboxView: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
        marginLeft: 8,  
    },

    errorTextStyle: {
        color: '#DC2626',
        textAlign: 'center',
    }

  });
  
  export default userAlpacaModal;