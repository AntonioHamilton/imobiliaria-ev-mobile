import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { api } from '../../api/api';
import TextField from '../../components/TextField';
import Title from '../../components/Title';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/types';

export default function CreateAnnouncement({ route: { params: { imovelId } } }: any) {
    const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [data, setData] = useState<{[key: string]: string | number}>({});
    const [isLoading, setIsLoading] =  useState<boolean>(false);
  
    const handleChange = (value: string | number, name: string) => {
      const newData = data;
      newData[name] = value
      setData(newData)
    }

    function handlerRegisterAnnouncement() {
        if(data['titulo'] && data['descricao'] && data['valor'] && data['tipo']) {
            setIsLoading(true);
            api.post(`anuncios`, { ...data, imovelId }).then(result => {
                setIsLoading(false);
                Alert.alert('Aviso', 'Anúncio registrado!')
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
        <Title>
          Cadastro de Anúncio
        </Title>
        <TextField
          label="Título *"
          placeholder="Título do anúncio"
          autoCorrect={false}
          onChange={(value => handleChange(value, "titulo"))}
        />
        <TextField
          label="Descrição *"
          placeholder="Descrição do anúncio"
          autoCorrect={false}
          onChange={(value => handleChange(value, "descricao"))}
        />
        <TextField
          label="Valor *"
          placeholder="9999999.99"
          autoCorrect={false}
          keyboardType='numeric'
          onChange={(value => handleChange(value, "valor"))}
        />
        <TextField
          label="Tipo *"
          placeholder="Tipo do anúncio"
          autoCorrect={false}
          onChange={(value => handleChange(value, "tipo"))}
        />
        <Button style={{width: "80%"}} onPress={handlerRegisterAnnouncement}>
            {
                isLoading
                ?
                <ActivityIndicator />
                :
                "Cadastrar"
            }
        </Button>
      </View>
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
});
