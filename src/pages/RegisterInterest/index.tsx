import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import Card from '../../components/Card';
import Title from '../../components/Title';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/types';
import { api } from '../../api/api';
import TextField from '../../components/TextField';

export default function RegisterInterest({ route: { params: { id } } }: any) {
    const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [data, setData] = useState<{[key: string]: string | number}>({})
    const [isLoading, setIsLoading] =  useState<boolean>(false);

    const handleChange = (value: string | number, name: string) => {
        const newData = data;
        newData[name] = value
        setData(newData)
    }

    const handlerRegisterInterest = () => {
        if(data['nome'] && data['email'] && data['telefone']) {
            setIsLoading(true);
            api.post(`interessados/${id}`, data).then(result => {
                setIsLoading(false);
                Alert.alert('Aviso', 'Interesse registrado!')
                nav.navigate('Home');
            }).catch(error => {
                setIsLoading(false);
                Alert.alert('Aviso', 'Erro ao realizar o cadastro!')
            })
        } else Alert.alert('Aviso', 'Favor preencher todos os campos!');
    }

    return(
        <ScrollView>
        <View style={styles.container}>
          <Title>Demonstrar Interesse</Title>
          <Card>
            <View>
                <TextField
                label="Nome *"
                placeholder="Nome completo"
                autoCorrect={false}
                onChange={(value => handleChange(value, "nome"))}
                />
                <TextField
                label="E-mail *"
                placeholder="usuario@gmail.com"
                autoCorrect={false}
                onChange={(value => handleChange(value, "email"))}
                />
                <TextField
                label="Telefone *"
                placeholder="79999999999"
                autoCorrect={false}
                onChange={(value => handleChange(value, "telefone"))}
                />
                <Button style={{ marginTop: 20 }} onPress={() => handlerRegisterInterest()}>
                {
                    isLoading
                    ?
                    <ActivityIndicator />
                    :
                    "Confirmar"
                }
                </Button>
            </View>
          </Card>
        </View>
    </ScrollView>
    );

}

const styles = StyleSheet.create({
    container: {
        marginVertical: 20, 
        marginHorizontal: 16, 
        flex: 1, 
        marginTop: 40,
        alignItems: "center"
    },
})
