import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { api } from '../../api/api';
import { UserContext } from '../../context/userProvider';
import { TextInput } from "@react-native-material/core";

export default function LoginUser() {
    const { defineUser } = useContext(UserContext);

    const [cpf, setCPF] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function handlerLogin() {
        if(cpf && password) {
            setIsLoading(true)
            api.post('/login?cliente=true', {
                cpf,
                password
            })
                .then(result => {
                    setIsLoading(false)
                    defineUser(result.data, false)
                })
                .catch(error => {
                    setIsLoading(false)
                    Alert.alert('Aviso', 'Não foi possível realizar o login!')
                })
        } else
            Alert.alert("Aviso", "Favor verfique todos os campos!");
    }

    return(
        <View style={styles.container}>
           <View style={styles.form}>
            <Text style={styles.title}>KIT IN NET | USUÁRIO</Text>
                <TextInput
                    style={styles.input}
                    variant="outlined" 
                    label="CPF"
                    value={cpf}
                    onChangeText={text => setCPF(text)}
                />
                <TextInput
                    style={styles.input}
                    variant="outlined" 
                    label="Senha"
                    value={password}
                    onChangeText={text => setPassword(text)}
                    secureTextEntry
                />
                <TouchableOpacity style={styles.button} onPress={handlerLogin}>
                    {
                        isLoading
                        ?
                        <ActivityIndicator />
                        :
                        <Text style={styles.buttonText}>LOGIN</Text>
                    }
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
        padding: 38,
        borderRadius: 5,
    },
    title: {
        fontSize: 20,
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
