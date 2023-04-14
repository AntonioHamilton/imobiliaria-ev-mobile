import {Text, View} from "react-native"
import {ReactNode} from "react"
import React from "react";

const Title = ({children}: {children: ReactNode}) => (
  <View style={{backgroundColor: "#955cfd", width: "100%", borderRadius: 10, paddingVertical: 10, marginBottom: 10}}>
    <Text style={{fontSize: 30, fontWeight: "600", color: "#fff", textAlign: "center"}}>
      {children}
    </Text>
  </View>
)

export default Title;