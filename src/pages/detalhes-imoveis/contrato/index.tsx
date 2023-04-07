import React, { useState, useEffect } from "react";
import { View } from "react-native";
import { verContratos } from "src/services/contrato";
import CardContrato from "src/views/cards/CardContrato";

const Contrato: React.FC = () => {
  const [contratos, setContratos] = useState([]);

  const handleGetContratos = async () => {
    try {
      const response = await verContratos();
      setContratos(response);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleGetContratos();
  }, []);

  return (
    <View>
      {contratos.map((contrato) => (
        <CardContrato contrato={contrato} key={`${contrato.id}`} />
      ))}
    </View>
  );
};

export default Contrato;
