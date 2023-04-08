import {View, Text} from "react-native"

const EmptyState = ({text}: {text: string}) => (
  <View>
    <Text style={{fontSize: 25, textAlign: "center", fontWeight: "600", color: "#3a3541de"}}>
      {text}
    </Text>
  </View>
)

export default EmptyState