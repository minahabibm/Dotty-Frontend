import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { ConsoleTextProps } from '../../types/WebSockets';


export default function ConsoleText( { data }  : ConsoleTextProps) {
    return (
        <View style={styles.container}> 
            <Text style={styles.messageText}>{data.message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        // flex: 1, // Takes remaining space
        // flexDirection: 'column', // Arrange children vertically
        // justifyContent: 'flex-start', // Align items to the start of the main axis (top)
        // flexWrap: 'wrap', // Allow text to wrap into next line
    },
    messageText: {
        fontSize: 16,
    },
});