import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import ConsoleText from './MessageText';
import { UpdatesListProps } from '../../types/WebSockets';

export default function UpdatesList ({messages} : UpdatesListProps) {
    return (
        <FlatList 
            data={messages}
            renderItem={({ item }) => <ConsoleText data={item} />}
            keyExtractor={(item, index) => index.toString()}
            contentContainerStyle={styles.container}
            inverted
        />
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        marginLeft: 3,
    }
});