export interface Anuncio {
  id: number;
  titulo: string;
  descricao: string;
  dataDeCriacao: string;
  valor: number;
  tipo: string;
  imovel: Imovel | undefined;
}

export type Funcionario = {
  id: number
  nome: string
  email: string
  password: string
  token: string | null
}

export interface Imovel {
  id?: number;
  disponivel: boolean;
  area: number;
  iptu: number;
  endereco: Endereco;
  tipoId: number;
  tipo: Tipo;
}

export interface Endereco {
  id?: number;
  logradouro: string;
  cidade: string;
  estado: string;
  cep: string;
  pais: string;
  complemento?: string;
  numero: string;
}

export interface Tipo {
  id: number;
  nome: string;
}

export type Contrato = {
  id: number
  valor: number
  vencimento: Date
  tipo: string
  dataAssinatura: Date
  imovelId: number
  clienteId: number
}