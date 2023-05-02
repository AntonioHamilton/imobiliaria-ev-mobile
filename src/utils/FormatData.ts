import { formatCurrency, getSupportedCurrencies } from "react-native-format-currency";

export const formatType = (type: string) => {
  switch (type) {
    case "V":
      return "Venda"
    case "A":
      return "Aluguel"
    default:
      return "Venda"
  }
}

export const formatMoney = (price: number | undefined) => {
  if (price === undefined) return "R$ 0,00"
  return formatCurrency({ amount: price, code: "BRL" })[0]
}

export const formatFullDate = (formattedDate: Date) => {
  const date = new Date(formattedDate)
  if (date) return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
  return 'Não definido'
}

export const formatStringToDate = (date: string) => {
  const dateRegex = /^([1-9]|0[1-9]|[12][0-9]|3[01])[- /.]([1-9]|0[1-9]|1[012])[- /.](19|20)\d\d$/

  if (dateRegex.test(date)) {
    const dateFormatted = date.split('/')

    return {
      date: new Date(dateFormatted[2] as any, String(Number(dateFormatted[1]) - 1) as any, dateFormatted[0] as any), 
      error: false
    }
  }

  return {date: new Date(), error: true};
}

export const stateShortFormat = (state: string | undefined) => {
  switch (state) {
    case "Acre":
      return "AC";
    case "Alagoas":
      return "AL";
    case "Amapá":
      return "AP";
    case "Amazonas":
      return "AM";
    case "Bahia":
      return "BA";
    case "Ceará":
      return "CE";
    case "Distrito Federal":
      return "DF";
    case "Espírito Santo":
      return "ES";
    case "Goiás":
      return "GO";
    case "Maranhão":
      return "MA";
    case "Mato Grosso":
      return "MT";
    case "Mato Grosso do Sul":
      return "MS";
    case "Minas Gerais":
      return "MG";
    case "Pará":
      return "PA";
    case "Paraíba":
      return "PB";
    case "Paraná":
      return "PR";
    case "Pernambuco":
      return "PE";
    case "Piauí":
      return "PI";
    case "Rio de Janeiro":
      return "RJ";
    case "Rio Grande do Norte":
      return "RN";
    case "Rio Grande do Sul":
      return "RS";
    case "Rondônia":
      return "RO";
    case "Roraima":
      return "RR";
    case "Santa Catarina":
      return "SC";
    case "São Paulo":
      return "SP";
    case "Sergipe":
      return "SE";
    case "Tocantins":
      return "TO";
  }
};

export const locationFormat = (
  city: string | undefined,
  state: string | undefined,
  country: string | undefined
) => {
  return `${city}/${stateShortFormat(state)}, ${country}`;
};

export const formatDate = (date: any) => {
  if (date === undefined) return ""
  let newDate = date.split("T")[0];
  return newDate.split("-").reverse().join("/");
};

export const areaFormat = (value: number | undefined): string => {
  if (value) return `${value}m²`;
  return "indefinido";
};

export const formatPropertyType = (value: string) => {
  switch(value) {
    case "casa":
      return 1
    case "terreno":
      return 2
    case "apartamento":
      return 3
    default:
      return 1
  }
}