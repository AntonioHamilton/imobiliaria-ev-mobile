import React, { useState } from "react";
import { View, Text } from "react-native";
import { getFuncionario } from "src/services/funcionarios";

const AccountSettings = ({ funcionario }) => {
  // ** State
  const [value, setValue] = useState<string>("account");

  const handleChange = (newValue: string) => {
    setValue(newValue);
  };

  return (
    <View>
      <View style={{ borderBottomWidth: 1, borderColor: "#CCC" }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ marginLeft: 10 }}>Dados da conta</Text>
        </View>
      </View>

      <View>
        {value === "account" && (
          <TabAccount funcionario={funcionario} />
        )}
      </View>
    </View>
  );
};

export const getServerSideProps = async (ctx) => {
  const { id } = ctx.query;

  const funcionario = await getFuncionario(id);
  return { props: { funcionario } };
};

export default AccountSettings;
