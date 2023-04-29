import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import Button from '../../components/Button';
import Title from '../../components/Title';
import TextField from '../../components/TextField';
import { Picker } from '@react-native-picker/picker';
import { api } from '../../api/api';
import { UserContext } from '../../context/userProvider';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/types';
import Loading from '../../components/Loading';

const RegisterProperty = ({ route: { params: { id } } }: any) => {
  const [loading, setLoading] = useState(false)
  const [defaultProperty, setDefaultProperty] = useState<any>()
  const [data, setData] = useState<{[key: string]: string | number | boolean}>({});
  const { user } = useContext(UserContext);

  const [type, setType] = useState<any>(1);
  const [avaiability, setAvaiability] = useState<any>(0);

  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const getProperty = async () => {
    setLoading(true)

    try {
      const {data} = await api.get(`/imoveis/${id}`)
      setDefaultProperty(data);
      setData({
        iptu: data.iptu,
        area: data.area,
        cep: data.endereco.cep,
        cidade: data.endereco.cidade,
        estado: data.endereco.estado,
        logradouro: data.endereco.logradouro,
        numero: data.endereco.numero,
        pais: data.endereco.pais,
        complemento: data.endereco.complemento,
      })
    } catch (e) {
      console.error(e)
    }

    setLoading(false);    
  }

  useEffect(() => {
    if (id) {
      getProperty()
    }
  }, [])

  const cadastrarImovel = async (imovel: any) => {
    try {
      return await api.post("/imoveis", imovel);
    } catch (e) {
      throw new Error();
    }
  };

  const alterarImovel = async (id: number, imovel: any) => {
    try {
      const response = await api.put(`/imoveis/${id}`, imovel);
      return response.data;
    } catch (e) {
      throw new Error();
    }
  };

  const onSubmit = async () => {
    
    try {
      const imovel = {
        funcionarioId: user.data.id,
        enderecoId: defaultProperty?.enderecoId ?? null,
        disponivel: Boolean(avaiability),
        area: Number(data.area),
        iptu: data.iptu,
        tipoId: Number(type),
        endereco: {
          logradouro: data.logradouro,
          cidade: data.cidade,
          pais: data.pais,
          estado: data.estado,
          cep: data.cep,
          numero: data.numero,
          complemento: data.complemento ?? null
        },
      };

      setLoading(true);
      if (!!id) {
        await alterarImovel(id, imovel);
      } else {
        await cadastrarImovel(imovel)
      }
      setLoading(false);
      nav.navigate('Properties')
    } catch (err: unknown) {
      setLoading(false);
      Alert.alert("Não foi possível cadastrar o imóvel");
    }
  };

  const handleChange = (value: string | number, name: string) => {
    const newData = data;
    newData[name] = value
    setData(newData)
  }

  return (
      <ScrollView>
        {!loading && <View style={styles.container}>
          <Title>
            {id ? "Atualizar Imóvel" : "Cadastrar Imóvel"}
          </Title>
          <Text style={styles.formTitle}>Sobre o imóvel</Text>
          <Text style={styles.pickerLabel}>Disponibilidade *</Text>
          <Picker
            style={styles.picker}
            selectedValue={avaiability ?? defaultProperty?.disponivel ? 1 : 0}
            onValueChange={(itemValue) => setAvaiability(itemValue)}
          >
            <Picker.Item label="Disponível" value={1} />
            <Picker.Item label="Indisponível" value={0} />
          </Picker>
          <Text style={styles.pickerLabel}>Tipo de imóvel *</Text>
          <Picker
            style={styles.picker}
            selectedValue={type ?? defaultProperty?.tipoId}
            onValueChange={(itemValue) => setType(itemValue)}
          >
            <Picker.Item label="Casa" value="1" />
            <Picker.Item label="Terreno" value="2" />
            <Picker.Item label="Apartamento" value="3" />
          </Picker>
          <TextField
            defaultValue={String(defaultProperty?.area ?? "")}
            label='Área (m²) *'
            onChange={(value) => handleChange(value, "area")}
            autoCorrect={false}
            placeholder='22 m²'
          />
          <TextField
            defaultValue={defaultProperty?.iptu}
            label='IPTU (R$) *'
            onChange={(value) => handleChange(value, "iptu")}
            autoCorrect={false}
            placeholder='1000,00'
          />
          <Text style={styles.formTitle}>Informações de Endereço</Text>
          <TextField
            defaultValue={defaultProperty?.endereco.logradouro}
            label='Logradouro *'
            onChange={(value) => handleChange(value, "logradouro")}
            autoCorrect={false}
            placeholder='Logradouro'
          />
          <TextField
            defaultValue={defaultProperty?.endereco.numero}
            label='Número *'
            onChange={(value) => handleChange(value, "numero")}
            autoCorrect={false}
            placeholder='Número'
          />
          <TextField
            defaultValue={defaultProperty?.endereco.complemento}
            label='Complemento (opcional)'
            onChange={(value) => handleChange(value, "complemento")}
            autoCorrect={false}
            placeholder='Complemento (opcional)'
          />
           <TextField
            defaultValue={defaultProperty?.endereco.cep}
            label='CEP *'
            onChange={(value) => handleChange(value, "cep")}
            autoCorrect={false}
            placeholder='CEP'
          />
          <TextField
            defaultValue={defaultProperty?.endereco.cidade}
            label='Cidade *'
            onChange={(value) => handleChange(value, "cidade")}
            autoCorrect={false}
            placeholder='Cidade'
          />
          <TextField
            defaultValue={defaultProperty?.endereco.estado}
            label='Estado *'
            onChange={(value) => handleChange(value, "estado")}
            autoCorrect={false}
            placeholder='Estado'
          />
          <TextField
            defaultValue={defaultProperty?.endereco.pais}
            label='País *'
            onChange={(value) => handleChange(value, "pais")}
            autoCorrect={false}
            placeholder='País'
          />
          <Button
            style={{width: "80%", alignSelf: "center"}}
            onPress={() => onSubmit()} 
          >
            {id ? "Atualizar Imóvel" : "Cadastrar Imóvel"}
          </Button>
      </View>
      }
      {loading && <Loading/>}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 20, 
    marginHorizontal: 16, 
    flex: 1,
    marginTop: 40,
    paddingBottom: 50
  },
  formTitle: {
    textAlign: "center",
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 16,
  },
  picker: {
    marginBottom: 16,
    backgroundColor: "#9155fd",
    width: "100%",
    color: "white",
  },
  pickerLabel:  {
    fontSize: 18,
    fontWeight: '600',
    color: '#6c48af',
    textAlign: "left",
    marginBottom: 6
  }
});

export default RegisterProperty;