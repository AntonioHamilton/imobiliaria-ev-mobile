import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { ReactNode } from 'react'

type ButtonProps = {
  children: ReactNode;
  onPress?: () => void;
  style?: {[key: string]: string | number}
}

const Button = ({children, onPress, style}: ButtonProps) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.btn, style]}
  >
    <Text style={styles.btnTxt}>{children}</Text>
  </TouchableOpacity>
)


const styles = StyleSheet.create({
  btn: {
    width: '100%',
    backgroundColor: '#9155fd',
    height: 45,
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
})


export default Button;