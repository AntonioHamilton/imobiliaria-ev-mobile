import React from "react";
import { View } from "react-native";
import DatePickerWrapper from "src/@core/styles/libs/react-datepicker";
import FormularioImovel from "src/views/form-layouts/FormularioImovel";
import { GetServerSidePropsContext } from "next";
import { getImovel } from "src/services/imovel";
import { Imovel } from "src/models";

type AlterarImovelProps = {
  imovel: Imovel;
};

const AlterarImovel: React.FC<AlterarImovelProps> = ({ imovel }) => {
  return (
    <DatePickerWrapper>
      <View style={{ padding: 12 }}>
        <FormularioImovel imovel={imovel} />
      </View>
    </DatePickerWrapper>
  );
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const { id } = ctx.query;
  const imovel = await getImovel(Number(id));
  return { props: { imovel } };
};

export default AlterarImovel;
