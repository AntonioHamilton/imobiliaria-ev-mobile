import React, { Component, useState } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
    StatusBar,
    Image,
    Button,
    Alert
  } from 'react-native';

export default function Login () {

    return (
        <View style={styles.container}>
          <View>
            <Text style={styles.label}>Usuário</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder='Usuário'
            autoCorrect={false}
            //onChangeText={(username => setUsername(username))}
          />
          <View>
            <Text style={styles.label}>Senha</Text>
          </View>
          <TextInput
            style={styles.input}
            placeholder='Senha'
            autoCorrect={false}
            //onChangeText={(senha => setSenha(senha))}
            secureTextEntry={true}
          />
          <TouchableOpacity
            //onPress={() => navigation.navigate('Home')}
            style={styles.btn}
          >
            <Text style={styles.btnTxt}>Entrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            //onPress={() = }
            style={styles.btn}
          >
            <Text style={styles.btnTxt}>Cadastro</Text>
          </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold'
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%'
    },
    label: {
      fontSize: 24
    },
    input: {
      width: '90%',
      height: 50,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: '#a566ff',
      fontSize: 17,
      marginTop: 10,
      marginBottom: 30,
      padding: 10,
      paddingLeft: 25,
      paddingRight: 25,
      bottom: 0
    },
    btn: {
      width: '80%',
      backgroundColor: '#d400ff',
      height: 45,
      marginBottom: 10,
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
    btnTxt: {
      color: '#ffffff',
      fontSize: 20
    },
    userInfo: {
      alignItems: 'center',
      justifyContent: 'center',
    },
    profilePic: {
      width: 70,
      height: 70
    }
  });