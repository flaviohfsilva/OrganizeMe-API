export class CreateTarefaDto {
  nome: string;
  nomeTag: string | null;
  corTarefa: string | null;
  corTag: string | null;
  dataHora: Date;
  tempoInicio: number | null;
  tempoFinal: number | null;
  habito: boolean;
  idHabito: number | null;
}
