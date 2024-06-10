export interface BuscarLivro {
  nome: string;
}

export interface Tarefas {
  id: number;
  nome: string;
  nomeTag: string | null;
  status: boolean;
  ativo: boolean;
  habito: boolean;
  dataHora: Date;
  tempoInicio: number | null;
  tempoFinal: number | null;
  idHabito: number;
}
export interface Retorno {
  erro: boolean;
  mensagem: string;
  dados?: Tarefas[];
}
