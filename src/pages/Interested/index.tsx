import React, { useState, useEffect } from 'react';
import { View, Text, Alert, StyleSheet, ScrollView } from 'react-native';
import { api } from '../../api/api';
import { Button } from '@react-native-material/core';

export default function Interested({ route: { params: { id } } }: any) {

    const [interested, setInterested] = useState<any[]>([]);

    useEffect(() => {
        getInterested();
    }, [])

    const getInterested = () => {
        api.get(`/interessados/${id}`)
            .then(result => {
                setInterested(result.data)
            }).catch(error => Alert.alert('Aviso', 'Erro ao buscar por interessados!'))
    }

    const handlerRemoveInterested = (id: number) => {
        Alert.alert('Aviso', 'Realmente deseja deletar este interesse?', [
            {
                text: 'Não',
                onPress: () => {
                    console.log('Cancel')
                }
            },
            {
                text: 'Sim',
                onPress: () => {
                    api.delete(`/interessados/${id}`)
                        .then(result => {
                            getInterested();
                            Alert.alert('Aviso', 'Interesse deletado!')
                        }).catch(error => Alert.alert('Aviso', 'Erro ao deletar interessado!'))
                }
            }
        ])
    }

    return(
        <ScrollView>
            <View style={styles.container}>
                {
                    interested.length ? 
                    interested.map((itemInterested): any => (
                        <View key={itemInterested.id} style={styles.card}>
                            <Text style={styles.name}>{itemInterested.nome}</Text>
                            <Text style={styles.text}>Telefone: {itemInterested.telefone}</Text>
                            <Text style={styles.text}>E-mail: {itemInterested.email}</Text>
                            <Button title="Deletar Interessado" onPress={() => handlerRemoveInterested(itemInterested.id)} />
                        </View>
                    ))
                    :
                    <Text style={styles.title}>Sem interesses cadastrados!</Text>
                }
            </View>
        </ScrollView>
    );

}

const styles = StyleSheet.create({
    container: {
        paddingTop: 40,
        paddingBottom: 20
    },
    card: {
        marginHorizontal: 20,
        marginVertical: 10,
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 5
    },
    name: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 10
    },
    text: {
        fontSize: 12,
        marginBottom: 10
    },
    title: {
        textAlign: 'center',
        marginTop: 20
    }
});