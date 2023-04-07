import React from "react";
import { View } from "react-native";
import Grid from "src/@core/styles/libs/react-grid-system";

import DatePickerWrapper from "src/@core/styles/libs/react-datepicker";
import FormularioImovel from "src/views/form-layouts/FormularioImovel";

type CriarImovelProps = {};

const CriarImovel: React.FC<CriarImovelProps> = () => {
  return (
    <DatePickerWrapper>
      <Grid>
        <View style={{ marginHorizontal: 12 }}>
          <FormularioImovel />
        </View>
      </Grid>
    </DatePickerWrapper>
  );
};

export default CriarImovel;
