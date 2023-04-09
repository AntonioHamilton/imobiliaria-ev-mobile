import {View, Text, StyleSheet} from "react-native"
import Button from "./Button";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import { NavigatorScreenParams, useNavigation } from "@react-navigation/native";

type CardProps = {
  title: string, 
  type: string, 
  price: string,
  navConfig: any,
}

const AnnouncementCard = ({title, type, price, navConfig}: CardProps) => {
  const nav = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const redirect = () => {
    nav.navigate(navConfig.link, { id: navConfig.id })
  }

  return (
    <View style={[styles.container, styles.shadowProp]}>
    <View style={styles.textContainer}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{type}</Text>
      <Text style={styles.price}>{price}</Text>
    </View>
    <Button style={{ borderTopRightRadius: 0, borderTopLeftRadius: 0 }} onPress={redirect}>Detalhes</Button>
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
  title: {
    marginBottom: 8,
    fontSize: 20,
    fontWeight: "500",
    color: "rgba(58, 53, 65, 0.87)"
  },
  description:{
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "500",
    color: "rgba(58, 53, 65, 0.68)"
  },
  price:{
    fontSize: 16,
    marginBottom: 8,
    fontWeight: "400",
    color: "rgba(58, 53, 65, 0.87)"
  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
})

export default AnnouncementCard;