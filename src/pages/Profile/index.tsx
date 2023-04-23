import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { api } from '../../api/api';
import { UserContext } from '../../context/userProvider';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/types';

export default function Profile() {
  const { user, defineUser } = useContext(UserContext);
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  async function handlerLogout() {
    nav.navigate('Announcements')
    defineUser({}, false)
  }

    return(
        <View style={styles.container}>
           <View style={styles.form}>
            <Text style={styles.title}>PERFIL</Text>
                <Text>{user.data.nome}</Text>
                <TouchableOpacity style={styles.button} onPress={handlerLogout}>
                    <Text style={styles.buttonText}>SAIR</Text>
                </TouchableOpacity>
           </View>
        </View>
    );
}

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f1f1f1'
    },
    form: {
        width: '85%',
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        borderRadius: 5,
    },
    title: {
        fontSize: 22,
        color: 'gray',
        marginBottom: 30,
        fontWeight: 'bold'
    },
    button: {
        backgroundColor: 'rgb(145, 85, 253)',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff'
    }
});
