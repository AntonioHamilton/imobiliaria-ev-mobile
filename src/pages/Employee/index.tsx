import React, { useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { api } from '../../api/api';
import { EmployeeContext } from '../../context/employeeProvider';

export default function Employee() {
    const { setToken } = useContext(EmployeeContext);

    async function handlerLogout() {
        setToken(null)
    }

    return(
        <View style={styles.container}>
           <View style={styles.form}>
            <Text style={styles.title}>Gerencial</Text>
                <Text>Funcionário</Text>
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
