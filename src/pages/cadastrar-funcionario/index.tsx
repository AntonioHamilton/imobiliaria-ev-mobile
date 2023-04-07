import React from "react";
import { View } from "react-native";
import { Grid } from "native-base";

import FormularioFuncionario from "../views/form-layouts/FormularioFuncionario";

const CadastrarFuncionario: React.FC = () => {
  return (
    <View>
      <Grid>
        <Grid.Item size={12} md={6}>
          <FormularioFuncionario />
        </Grid.Item>
      </Grid>
    </View>
  );
};

export default CadastrarFuncionario;
