import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Alert, ScrollView, StyleSheet } from 'react-native';
import { api } from '../../api/api';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../context/userProvider';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/types';
import { formatStringToDate } from '../../utils/FormatData';
import Title from '../../components/Title';
import TextField from '../../components/TextField';
import { Button, Switch } from '@react-native-material/core';
import Loading from '../../components/Loading';

export default function ChangeUser() {
    const { user, defineUser } = useContext(UserContext);
    const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [loading, setLoading] = useState(false)
    const [changePassword, setChangePassword] = useState(false)
    const [cliente, setCliente] = useState<{[key: string]: string | number | boolean | Date}>({
        nome: "",
        cpf: "",
        rg: "",
        dataNascimento: '',
        telefone: "",
        email: "",
        password: ""
    });

    useEffect(() => {
        setCliente({
            nome: user.data.nome,
            cpf: user.data.cpf,
            rg: user.data.rg,
            dataNascimento: new Date(user.data.dataNascimento).toISOString().split('T')[0].split('-').reverse().join('/'),
            telefone: user.data.telefone,
            email: user.data.email,
            password: ""
        })
    }, [])
    
    const handleChange = (type: string, value: string | number, name: string) => {
        if (type === "cliente") {
        const newData = cliente;
        newData[name] = value
        setCliente(newData)
        }
    }
    
    const onSubmit = () => {
        if(cliente["nome"] &&
           cliente["cpf"] &&
           cliente["rg"] &&
           cliente["dataNascimento"] &&
           cliente["telefone"] &&
           cliente["email"] &&
           cliente["password"]) {
            setLoading(true);
            const nascimentoFormatted = formatStringToDate(cliente.dataNascimento as string)
        
            if (nascimentoFormatted.error) {
            Alert.alert('Adicione uma data de nascimento válida')
            return
            }
        
            api.put(`/cliente/${user.data.id}`, {...cliente, dataNascimento: nascimentoFormatted.date}).then(() => {
                defineUser(cliente)
                Alert.alert("Usuário atualizdo com sucesso!")
                nav.navigate("Profile")
            }).catch(e => {
                Alert.alert("Não foi possível atualizar o usuário")
            })
            setLoading(false);
        } else Alert.alert("Aviso", "Favor preencher todos os campos!");
    }
    
    return (
        <ScrollView>
        {!loading && 
        <View style={styles.container}>
            <Title>
            Edição
            </Title>
            <Text style={styles.formTitle}>Dados do usuário</Text>
            <TextField
            label="Nome *"
            placeholder="Nome completo"
            autoCorrect={false}
            defaultValue={cliente?.nome ? cliente?.nome.toString() : ""}
            onChange={(value => handleChange('cliente', value, "nome"))}
            />
            <TextField
            label="CPF *"
            placeholder="99999999999"
            autoCorrect={false}
            keyboardType='numeric'
            defaultValue={cliente?.cpf ? cliente?.cpf.toString() : ""}
            onChange={(value => handleChange('cliente', value, "cpf"))}
            />
            <TextField
            label="RG *"
            placeholder="99999999"
            autoCorrect={false}
            keyboardType='numeric'
            defaultValue={cliente?.rg ? cliente?.rg.toString() : ""}
            onChange={(value => handleChange('cliente', value, "rg"))}
            />
            <TextField
            label="Data de nascimento *"
            placeholder="01/01/2001"
            autoCorrect={false}
            defaultValue={cliente?.dataNascimento ? cliente?.dataNascimento.toString() : ""}
            onChange={(value => handleChange('cliente', value, "dataNascimento"))}
            />
            <TextField
            label="Telefone *"
            placeholder="79999999999"
            autoCorrect={false}
            defaultValue={cliente?.telefone ? cliente?.telefone.toString() : ""}
            onChange={(value => handleChange('cliente', value, "telefone"))}
            />
            <TextField
            label="Email *"
            placeholder="usuario@gmail.com"
            autoCorrect={false}
            defaultValue={cliente?.email ? cliente?.email.toString() : ""}
            onChange={(value => handleChange('cliente', value, "email"))}
            />
            <View 
              style={{
                display: "flex", 
                flexDirection: "row", 
                alignItems: "center" 
              }}
            >
              <Switch 
                value={changePassword} 
                onChange={() => setChangePassword(!changePassword)}
                thumbColor="#9155fd"
                trackColor={{
                  true: "#c8a9fe",
                  false: "#89868ede"
                }}
              />
              <Text>Mudar a senha?</Text>
            </View>
            {changePassword && <TextField
            label="Senha *"
            placeholder="senha"
            secureTextEntry
            autoCorrect={false}
            onChange={(value => handleChange('cliente', value, "password"))}
            />}
            <Button onPress={onSubmit} title="Atualizar" />
        </View>}
        {loading && <Loading/>}
        </ScrollView>
    );
}
    
const styles = StyleSheet.create({
    container: {
    marginVertical: 20, 
    marginHorizontal: 16, 
    alignItems: "center", 
    flex: 1,
    marginTop: 40,
    paddingBottom: 50,
    },
    formTitle: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 16,
    },
});
