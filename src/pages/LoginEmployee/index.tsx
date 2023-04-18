import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { api } from '../../api/api';
import { TextInput } from "@react-native-material/core";
import { EmployeeContext } from '../../context/employeeProvider';

export default function LoginEmployee() {
    const { token, setToken } = useContext(EmployeeContext);

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    async function handlerLogin() {
        if(email && password) {
            setIsLoading(true)
            setToken('test')
            // api.get('/login')
            //     .then(result => {
            //         console.log(result)
            //         setIsLoading(false)
            //         setToken('test')
            //     })
            //     .catch(error => {
            //         setIsLoading(false)
            //         Alert.alert('Aviso', 'Erro ao tentar realizar o login!')
            //     })
        } else
            Alert.alert("Aviso", "Favor verfique todos os campos!");
    }

    return(
        <View style={styles.container}>
           <View style={styles.form}>
            <Text style={styles.title}>KIT IN NET | FUNCIONÁRIO</Text>
                <TextInput
                    style={styles.input}
                    variant="outlined" 
                    label="E-mail"
                    value={email}
                    onChangeText={text => setEmail(text)}
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
