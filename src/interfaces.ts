export interface BuscarLivro {
  nome: string;
}

export interface Retorno {
  erro: boolean;
  mensagem: string;
  dados?: {}[] | any;
}