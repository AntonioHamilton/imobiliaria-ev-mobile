import React from "react";
import { View } from "react-native";
import { Grid } from "native-base";

// ** Styled Component
import DatePickerWrapper from "src/@core/styles/libs/react-datepicker";

// ** Demo Components Imports
import FormularioAnuncio from "src/views/form-layouts/FormularioAnuncio";

type CriarAnuncioProps = {
  imovelId: number;
};

const CriarAnuncio: React.FC<CriarAnuncioProps> = ({ imovelId }) => {
  return (
    <DatePickerWrapper>
      <Grid container>
        <Grid item xs={12} md={6}>
          <FormularioAnuncio imovelId={imovelId} />
        </Grid>
      </Grid>
    </DatePickerWrapper>
  );
};

export const getServerSideProps = (ctx: any) => {
  const { id } = ctx.query;
  return { props: { imovelId: Number(id) } };
};

export default CriarAnuncio;