import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { ConsoleTextProps } from '../../types/WebSockets';


export default function ConsoleText( { data }  : ConsoleTextProps) {
    return (
        <View style={styles.container}> 
            <Text style={styles.messageText}> {data.message} </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
    //   flex: 1,
    //   backgroundColor: '#fff',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    },
    messageText: {
        fontSize: 16,
    },
});