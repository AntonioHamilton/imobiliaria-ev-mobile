import React, { useState } from "react";
import { Alert } from "react-native";
import { useNavigation, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Imovel } from "src/models";
import Loading from "src/layouts/components/Loading";
import PropertyCard from "src/views/cards/PropertyCard";
import ModalRevogarContrato from "src/views/utils/ModalRevogarContrato";
import { getImovel, removerImovel } from "src/services/imovel";

type RootStackParamList = {
  PropertyDetails: { id: number };
  CriarAnuncio: { imovelId: number };
  AlterarImovel: { id: number };
  EmitirContrato: { id: number };
  Contrato: { id: number };
};

type PropertyDetailsRouteProp = RouteProp<RootStackParamList, "PropertyDetails">;

type PropertyDetailsProps = {
  route: PropertyDetailsRouteProp;
};

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ route }) => {
  const { id } = route.params;
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const redirectToCreateAdPage = () => {
    navigation.navigate("CriarAnuncio", { imovelId: id });
  };

  const redirectToEditPropertyPage = () => {
    navigation.navigate("AlterarImovel", { id });
  };

  const emitContrat = () => {
    navigation.navigate("EmitirContrato", { id });
  };

  const viewContract = () => {
    navigation.navigate("Contrato", { id });
  };

  const deleteProperty = async () => {
    try {
      setIsLoading(true);
      await removerImovel(id);
      navigation.navigate("ListaImoveis");
    } catch (e) {
      setError("Não foi possível remover esse imóvel");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      {error && (
        <Alert
          severity="error"
          style={{ marginBottom: 20 }}
          onClose={() => setError("")}
        >
          {error}
        </Alert>
      )}
      <PropertyCard
        onDeleteClick={deleteProperty}
        onCreateAdClick={redirectToCreateAdPage}
        onEditPropertyClick={redirectToEditPropertyPage}
        onEmitContrat={emitContrat}
        onViewContract={viewContract}
        imovel={getImovel(id)}
      />
    </>
  );
};

export default PropertyDetails;
