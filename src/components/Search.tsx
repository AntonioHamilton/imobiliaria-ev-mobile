import {View, TextInput, StyleSheet} from 'react-native'
import SearchIcon from '../assets/icons/SearchIcon'

const Search = ({setSearch, placeholder = "Buscar"} : {setSearch: Function, placeholder?: string}) => {
  return (
    <View style={styles.view}>
      <SearchIcon />
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        onChangeText={data => setSearch(data)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: "row",
    width: '100%',
    height: 50,
    borderWidth: 2,
    borderRadius: 40,
    borderColor: "#89868ede",
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 25,
    paddingRight: 25,
    alignItems: "center",
  },
  input: {
    fontSize: 20,
    height: 50,
    width: "100%",
    color: "#3a3541de",
    paddingHorizontal: 12
  }
})

export default Search