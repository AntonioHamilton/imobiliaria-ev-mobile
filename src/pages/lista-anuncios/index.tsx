import React, { useContext, useEffect, useState } from "react";
import { View, Text } from "react-native";
import { SearchContext } from "src/@core/context/searchContext";
import useDebounce from "src/@core/hooks/useDebounce";
import Loading from "src/layouts/components/Loading";
import { Anuncio } from "src/models";
import { listarAnuncios } from "src/services/anuncios";
import CardAnuncio from "src/views/cards/CardAnuncioLista";

const ListaDeAnuncios = () => {
  const [anuncios, setAnuncios] = useState<Anuncio[]>([]);
  const [filteredAnuncios, setFilteredAnuncios] = useState<Anuncio[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { searchTerm, setSearchTerm } = useContext(SearchContext);

  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  useEffect(() => {
    setSearchTerm("");
    getAnnouncements();
  }, []);

  const getAnnouncements = async () => {
    setIsLoading(true);
    await listarAnuncios().then((anuncios: Anuncio[]) => {
      setAnuncios(anuncios);
      setFilteredAnuncios(anuncios);
      setIsLoading(false);
    });
  };

  useEffect(() => {
    setFilteredAnuncios(searchList());
  }, [debouncedSearchTerm]);

  const searchList = () => {
    if (debouncedSearchTerm && anuncios) {
      return anuncios.filter((anuncio: Anuncio) => {
        return (
          anuncio.titulo
            .toLowerCase()
            .search(debouncedSearchTerm.toLowerCase()) >= 0
        );
      });
    }
    return anuncios;
  };

  return (
    <View>
      {!isLoading && filteredAnuncios.map((anuncio: Anuncio) => {
        return (
          <CardAnuncio key={anuncio.id} {...anuncio} />
        )
      })}
      {filteredAnuncios.length === 0 && !isLoading && (
        <View style={{ height: 400, justifyContent: "center", alignItems: "center" }}>
          <Text style={{ fontSize: 20 }}>Não existem anúncios ainda!</Text>
        </View>
      )}
      {isLoading && filteredAnuncios.length === 0 && <Loading />}
    </View>
  );
};

export default ListaDeAnuncios;