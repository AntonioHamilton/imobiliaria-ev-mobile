import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { api } from '../../api/api';
import { UserContext } from '../../context/userProvider';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/types';
import Button from '../../components/Button';
import Card from '../../components/Card';
import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');
const newHeight = height - 120

export default function Profile() {
  const { user, defineUser } = useContext(UserContext);
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  async function handlerLogout() {
    nav.navigate('Announcements')
    defineUser({}, false)
  }

  const handleDelete = () => {
    Alert.alert('Aviso', 'Realmente deseja deletar este usuário?', [
      {
          text: 'Não',
          onPress: () => {
            console.log('Cancel')
          }
      },
      {
          text: 'Sim',
          onPress: () => {
            api.delete(`/cliente/${user.data.id}`)
                  .then(() => {
                      Alert.alert('Aviso', 'Usuário deletado!')
                      nav.navigate('Announcements')
                      defineUser({}, false)
                  }).catch(() => Alert.alert('Aviso', 'Erro ao deletar usuário!'))
          }
      }
    ])
  }

  return(
    <ScrollView>
      <View style={styles.wrapper}>
        <Card>
          <View style={styles.container}>
            <Text style={styles.title}>PERFIL</Text>
            <Text style={styles.name}>{user.data.nome}</Text>
            <Text style={styles.name}>email: {user.data.email}</Text>
            <Text style={styles.name}>telefone: {user.data.telefone}</Text>
            <Text style={styles.name}>dataNascimento: {user.data.dataNascimento}</Text>
          </View>
        </Card>
        {!user.isEmployee && <View style={styles.buttonWrapper}>
          <Button onPress={() => nav.navigate('Favorites')} transparent style={{...styles.buttonTransparent, marginBottom: 0, marginTop: 0}}>
              Visualizar Favoritos
          </Button>
          <Button onPress={handlerLogout}>
            Sair
          </Button>
          <Button style={styles.buttonDelete} onPress={handleDelete}>
            Excluir Perfil
          </Button>
        </View>}
      </View>
    </ScrollView>
  );
}

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    height: newHeight,
    marginVertical: 20, 
    marginHorizontal: 16, 
    alignItems: "center", 
    flex: 1,
    justifyContent: 'space-between',
    alignContent: 'space-between',
    marginTop: 40,
  },
  buttonWrapper: {
    alignItems: "center",
    display: 'flex',
    width: "100%"
  },
  title: {
    fontSize: 22,
    color: 'gray',
    marginBottom: 30,
    fontWeight: 'bold'
  },
  name: {
    fontSize: 20,
    textAlign: "center",
  },
  buttonTransparent: {
    backgroundColor: "transparent",
    shadowColor: "transparent",
  },
  buttonDelete: {
    marginTop: 8,
    backgroundColor: "#FF4C51"
  }
});
