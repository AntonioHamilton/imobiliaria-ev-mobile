import React, { useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Loading from "src/layouts/components/Loading";
import CardFuncionario from "src/views/cards/CardFuncionario";
import { Funcionario } from "src/models";
import { listarFuncionarios } from "src/services/funcionarios";
import { useNavigation } from "@react-navigation/native";

const Funcionarios: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [funcionarios, setFuncionarios] = useState<Funcionario[]>([]);
  const navigation = useNavigation();

  useEffect(() => {
    listarFuncionarios()
      .then((funcionarios: Funcionario[]) => setFuncionarios(funcionarios))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <View>
      <Button
        title="Cadastrar Funcionário"
        onPress={() => navigation.navigate("Cadastrar Funcionário")}
      />

      <ScrollView>
        {funcionarios.length === 0 && !isLoading ? (
          <View style={{ height: 400, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ fontSize: 32 }}>Nenhum funcionário cadastrado</Text>
          </View>
        ) : isLoading ? (
          <Loading />
        ) : (
          funcionarios.map((funcionario: Funcionario) => (
            <CardFuncionario {...funcionario} key={`${funcionario.id}`} />
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default Funcionarios;
