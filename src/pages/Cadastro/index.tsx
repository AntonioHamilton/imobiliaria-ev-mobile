import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native';

export default function Cadastro() {
    //variables
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [rg, setRg] = useState('');
    const [data_de_nascimento, setData_de_nascimento] = useState('')
    const [telefone, setTelefone] = useState('')


    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.label}>
                    <Text style={styles.TopText}>Cadastro</Text>
                </View>
                <View style={styles.label}>
                    <Text style={styles.labelText}>Nome</Text>
                </View>
                <TextInput
                    style={styles.input}

                    placeholder="Nome completo"
                    autoCorrect={false}
                    onChangeText={(Nome => setNome(Nome))}
                />
                <View style={styles.label}>
                    <Text style={styles.labelText}>CPF</Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="CPF"
                    autoCorrect={false}
                    keyboardType='numeric'
                    onChangeText={(cpf => setCpf(cpf))}
                />
                <View style={styles.label}>
                    <Text style={styles.labelText}>RG</Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="RG"
                    autoCorrect={false}
                    keyboardType='numeric'
                    onChangeText={(rg => setRg(rg))}
                />
                <View style={styles.label}>
                    <Text style={styles.labelText}>Data de Nascimento</Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="01/01/2001"
                    autoCorrect={false}
                    //keyboardType='numeric'
                    onChangeText={(data_de_nascimento => setData_de_nascimento(data_de_nascimento))}
                />
                <View style={styles.label}>
                    <Text style={styles.labelText}>Telefone</Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="99913168"
                    autoCorrect={false}
                    keyboardType='numeric'
                    onChangeText={(telefone => setTelefone(telefone))}
                />

                <View style={styles.label}>
                    <Text style={styles.labelText}>Email</Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    autoCorrect={false}
                    keyboardType='email-address'
                    onChangeText={(email => setEmail(email))}
                />

                <View style={styles.label}>
                    <Text style={styles.labelText}>Senha</Text>
                </View>
                <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    autoCorrect={false}
                    onChangeText={(senha => setSenha(senha))}
                    secureTextEntry={true}

                />


                <TouchableOpacity style={styles.btnLogin}
                //onPress={() => {}} 
                >

                    <Text style={styles.loginText}>Cadastrar</Text>
                </TouchableOpacity>
            </View>
            <View>

            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingBottom: 50,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    input: {
        width: '90%',
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        borderColor: '#000000',
        backgroundColor: '#FFFFFF',
        fontSize: 17,
        marginTop: 10,
        marginBottom: 30,
        padding: 10,
        paddingLeft: 25,
        paddingRight: 25
    },

    label: {
        width: '90%',
        paddingLeft: 25,
        marginBottom: -10
    },

    labelText: {
        fontSize: 24,
        color: '#000000',
        opacity: 0.5
    },
    TopText: {
        fontSize: 50,
        color: '#000000',
        opacity: 0.5,
        alignItems: 'center'
    },


    btnLogin: {
        width: '80%',
        backgroundColor: '#9155fd',
        height: 45,
        marginBottom: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25
    },

    loginText: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 15.75,
        lineHeight: 24,
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        letterSpacing: 20, // usar styles components
        color: '#fff'
    },
    loginText2: {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontSize: 15.75,
        lineHeight: 24,
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        letterSpacing: 5, // usar styles components
        color: '#fff'
    },
});