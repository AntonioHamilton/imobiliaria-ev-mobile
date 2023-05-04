import { ScrollView, View } from "react-native";
import Title from "../../components/Title";
import React, { useCallback, useEffect, useState } from "react";
import Loading from "../../components/Loading";
import ContractCard from "../../components/ContractCard";
import { api } from "../../api/api";
import { Contrato } from "../../types/apiTypes";
import { formatFullDate, formatMoney, formatType } from "../../utils/FormatData";
import { useFocusEffect } from "@react-navigation/native";

const Contracts = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [contracts, setContracts] = useState<Contrato[]>([])

  const getContracts = async () => {
    setIsLoading(true);
    const response: any = await api.get('/contrato')

    setContracts(response.data)
    setIsLoading(false);
  }

  useFocusEffect(useCallback(() => {
    getContracts()
  },[]))

  return (
    <ScrollView>
      <View style={{ marginVertical: 20, marginHorizontal: 16, alignItems: "center", flex: 1, marginTop: 40 }}>
        <Title>CONTRATOS</Title>
        {!isLoading && 
          contracts.map((contract: Contrato) => 
          <ContractCard 
            key={contract.id}
            title={`${contract.id}`}
            date={formatFullDate(contract.vencimento)}
            price={formatMoney(contract.valor)}
            type={formatType(contract.tipo.toUpperCase())}
            navConfig={{
              link: 'ContractDetail',
              imovelId: contract.imovelId,
              contratoId: contract.id
            }}
          />
          )
        }
      </View>

      {isLoading && <Loading />}
    </ScrollView>
  )
}

export default Contracts;