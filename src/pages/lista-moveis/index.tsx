import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Loading from 'src/layouts/components/Loading';
import { Imovel } from 'src/models';
import { listarImoveis } from 'src/services/imovel';
import CardImovel from 'src/views/cards/CardImovelLista';

const ListaDeImoveis = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [listaDeImoveis, setListaDeImoveis] = useState([]);

  const navigation = useNavigation();

  const onCreateClick = () => navigation.navigate('CadastrarImovel');

  useEffect(() => {
    setIsLoading(true);
    listarImoveis().then((imoveis:any) => {
      setListaDeImoveis(imoveis);
      setIsLoading(false);
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <Button
        title="Cadastrar Imóvel"
        onPress={onCreateClick}
        style={{ marginBottom: 16 }}
      />
      {listaDeImoveis.length === 0 && !isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontSize: 24, marginBottom: 16 }}>
            Nenhum imóvel cadastrado
          </Text>
          <Text style={{ textAlign: 'center' }}>
            Clique em "Cadastrar Imóvel" para inserir um novo imóvel no sistema
          </Text>
        </View>
      ) : listaDeImoveis.length === 0 && isLoading ? (
        <Loading />
      ) : (
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {listaDeImoveis.map((imovel: Imovel) => (
              <View key={imovel.id} style={{ width: '50%', padding: 8 }}>
                <CardImovel {...imovel} />
              </View>
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default ListaDeImoveis;
