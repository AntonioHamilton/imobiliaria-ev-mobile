import { useEffect, useState, useContext } from "react";
import { View, ScrollView } from "react-native";
import { api } from "../../api/api";
import EmptyState from "../../components/EmptyState";
import Loading from "../../components/Loading";
import Search from "../../components/Search";
import Title from "../../components/Title";
import { SearchContext } from "../../context/searchProvider";
import useDebounce from "../../hooks/useDebounce";
import { Imovel } from "../../types/apiTypes";
import { formatType } from "../../utils/FormatData";
import PropertyCard from "../../components/PropertyCard";

const Properties = () => {
  const [properties, setProperties] = useState<Imovel[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Imovel[]>([]);
  const { searchTerm, setSearchTerm } = useContext(SearchContext);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 0);

  const getProperties = async () => {
    setIsLoading(true)

    try {
      const {data} = await api.get('/imoveis')
      setProperties(data);
      setFilteredProperties(data)
    } catch (e) {
      console.error(e)
    }

    setIsLoading(false);    
  }

  const searchInList = () => {
    if (debouncedSearchTerm && properties) {
      return properties.filter((property) => {
        return property.endereco.logradouro.toLowerCase().search(debouncedSearchTerm.toLowerCase()) >= 0
      })
    } 
    return properties
  }

  useEffect(() => {
    setSearchTerm('')
    getProperties()
  }, [])

  useEffect(() => {
    setFilteredProperties(searchInList())
  }, [debouncedSearchTerm])

  return (
    <ScrollView>
      <View style={{ marginVertical: 20, marginHorizontal: 16, alignItems: "center", flex: 1, marginTop: 40 }}>
        <Title>Imóveis</Title>
        <Search placeholder="Buscar por logradouro" setSearch={setSearchTerm}/>
        {!isLoading && filteredProperties.map((property) => (
          <PropertyCard
            key={property.id}
            street={property.endereco.logradouro} 
            type={property.tipo.nome} 
            address={`${property.endereco.cidade}/${property.endereco.estado.slice(0, 2).toUpperCase()},${" "}${property.endereco.pais}`} 
            navConfig={{link: "PropertyDetail", id: property.id}}
          />
        ))}
        {properties.length === 0 && !isLoading && <EmptyState text={"Não existem imóveis ainda!"}/>}
        {properties.length !== 0 && filteredProperties.length === 0 && !isLoading && <EmptyState text={"Nenhum imóvel foi encontrado para essa busca"}/>}
      </View>

      {isLoading && <Loading />}
    </ScrollView>
  )
}

export default Properties;