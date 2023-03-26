import {TextInput, StyleSheet} from 'react-native'

type TextField = {
  onChange: (data: string) => void;
  placeholder?: string;
  autoCorrect?: boolean;
  secureTextEntry?: boolean;
}

const TextField = ({onChange, placeholder, autoCorrect, secureTextEntry = false}: TextField) => (
  <TextInput
    style={styles.input}
    placeholder={placeholder}
    autoCorrect={autoCorrect}
    onChangeText={data => onChange(data)}
    secureTextEntry={secureTextEntry}
  />
)
const styles = StyleSheet.create({
  input: {
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#9155fd',
    fontSize: 17,
    marginTop: 10,
    marginBottom: 30,
    padding: 10,
    paddingLeft: 25,
    paddingRight: 25,
    bottom: 0
  },
})


export default TextField;