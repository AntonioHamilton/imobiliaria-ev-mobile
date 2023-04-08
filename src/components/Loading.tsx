import {View, ActivityIndicator, StyleSheet} from 'react-native'

const Loading = () => (
  <View style={[styles.container]}>
    <ActivityIndicator size={150} color="#9155fd"/>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: "center",
    marginTop: "60%",
    height: "100%"
  },
});

export default Loading;