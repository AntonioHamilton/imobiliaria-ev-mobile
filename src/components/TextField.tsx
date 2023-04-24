import React, {TextInput, StyleSheet, KeyboardTypeOptions, View, Text} from 'react-native'

type TextField = {
  onChange: (data: string) => void;
  placeholder?: string;
  autoCorrect?: boolean;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions
  label?: string
  defaultValue?: string 
}

const TextField = ({
  onChange, 
  placeholder, 
  autoCorrect, 
  keyboardType = 'default',
  secureTextEntry = false,
  label,
  defaultValue
}: TextField
) => (
  <View style={styles.container}>
    {label && <Text style={styles.label}>{label}</Text>}
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      autoCorrect={autoCorrect}
      onChangeText={data => onChange(data)}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      defaultValue={defaultValue}
    />
  </View>
)

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    fontSize: 18,
    marginBottom: -6,
    fontWeight: '600',
    color: '#6c48af',
  },
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#9155fd',
    fontSize: 20,
    marginTop: 10,
    marginBottom: 16,
    padding: 10,
    paddingLeft: 25,
    paddingRight: 25,
    bottom: 0
  },
})

export default TextField;