import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';
import BlankLayout from 'src/@core/layouts/BlankLayout';

interface State {
  password: string;
  showPassword: boolean;
}

const RegisterPage = () => {
  // ** States
  const [values, setValues] = useState<State>({
    password: "",
    showPassword: false,
  });

  // ** Hook
  const theme = useTheme();

  const handleChange = (prop: keyof State) => (text: string) => {
    setValues({ ...values, [prop]: text });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View
        style={{
          zIndex: 1,
          padding: theme?.spacing(12, 9, 7),
        }}>
        <TextInput
          autoFocus
          style={{ width: '100%', marginBottom: theme?.spacing(4) }}
          placeholder="Nome"
          onChangeText={handleChange('name')}
        />
        <TextInput
          style={{ width: '100%', marginBottom: theme?.spacing(4) }}
          placeholder="Email"
          onChangeText={handleChange('email')}
        />
        <View style={{ width: '100%', marginBottom: theme?.spacing(4) }}>
          <Text style={{ fontSize: 16, marginBottom: 4 }}>Senha</Text>
          <TextInput
            value={values.password}
            onChangeText={handleChange('password')}
            secureTextEntry={!values.showPassword}
            style={{ borderWidth: 1, borderColor: 'gray', borderRadius: 4, padding: 8 }}
          />
          <TouchableOpacity
            onPress={handleClickShowPassword}
            style={{ position: 'absolute', right: 8, bottom: 8 }}>
            <AntDesign
              name={values.showPassword ? 'eye' : 'eyeo'}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            width: '100%',
            padding: 16,
            backgroundColor: theme?.colors.primary,
            borderRadius: 4,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: theme?.spacing(7),
            marginBottom: theme?.spacing(7),
          }}>
          <Text style={{ color: 'white', fontSize: 18 }}>Cadastrar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

RegisterPage.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;

export default RegisterPage;
