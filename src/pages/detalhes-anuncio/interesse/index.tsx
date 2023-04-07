import React from "react";
import { Grid } from "react-native-super-grid";

import FormularioInteresse from "../views/form-layouts/FormularioInteresse";
import { GetServerSideProps } from "next";

type InteresseProps = {
  anuncioId: number;
};

const Interesse = ({ anuncioId }: InteresseProps) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={6}>
        <FormularioInteresse anuncioId={anuncioId} />
      </Grid>
    </Grid>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  return {
    props: {
      anuncioId: Number(context.query.id),
    },
  };
};

export default Interesse;
