import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { api } from '../../api/api';
import { UserContext } from '../../context/userProvider';
import { TextInput } from "@react-native-material/core";

export default function Login() {
    const { token, setToken } = useContext(UserContext);

    const [email, setEmail] = useState<String>('');
    const [password, setPassword] = useState<String>('');

    async function handlerLogin() {
        if(email && password) {
            // const result = await api.get('');
            // console.log(result)
            setToken('test')
        } else
            Alert.alert("Aviso", "Favor verfique todos os campos!");
    }

    return(
        <View style={styles.container}>
           <View style={styles.form}>
            <Text style={styles.title}>KIT IN NET</Text>
                <TextInput
                    style={styles.input}
                    variant="outlined" label="E-mail"
                    value={email}
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    style={styles.input}
                    inputProps={{ style: { borderColor: 'red', borderWith: 1 } }}
                    variant="outlined" label="Senha"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={handlerLogin}>
                    <Text style={styles.buttonText}>LOGIN</Text>
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
    input: {
        width: '100%',
        marginBottom: 10,
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
