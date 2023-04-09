import {View, Text, StyleSheet} from "react-native"
import Button from "./Button";
import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
}

const Card = ({children}: CardProps) => {

  return (
    <View style={[styles.container, styles.shadowProp]}>
    <View style={styles.textContainer}>
      {children}
    </View>
  </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: '100%',
    marginVertical: 8,
  },
  textContainer: {
    paddingVertical: 16,
    paddingHorizontal: 16
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
})

export default Card;