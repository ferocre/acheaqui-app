export interface Turno {
  inicio: string;
  fim: string;
}

export interface HorarioDia {
  aberto: boolean;
  turnos: Turno[];
}

export type DiaSemana =
  | 'domingo'
  | 'segunda'
  | 'terca'
  | 'quarta'
  | 'quinta'
  | 'sexta'
  | 'sabado';

export type HorariosFuncionamentoProps = {
  [dia in DiaSemana]: HorarioDia;
};

export interface HorariosCompletosProps {
  horario: HorariosFuncionamentoProps;
  horarioEspecial?: HorariosFuncionamentoProps;
  horarioFeriados?: HorariosFuncionamentoProps;
  horarioFeriadosEspeciais?: HorariosFuncionamentoProps;
  horarioFuncionamento?: string;
  horarioFuncionamentoFeriados?: string;
}

export const DEFAULT_HORARIO: HorarioDia = {
  aberto: false,
  turnos: [
    {
      inicio: '08:00',
      fim: '18:00',
    },
  ],
};

export const diasSemana: DiaSemana[] = [
  'domingo',
  'segunda',
  'terca',
  'quarta',
  'quinta',
  'sexta',
  'sabado',
];

export const nomesDias: Record<DiaSemana, string> = {
  domingo: 'Domingo',
  segunda: 'Segunda-feira',
  terca: 'Terça-feira',
  quarta: 'Quarta-feira',
  quinta: 'Quinta-feira',
  sexta: 'Sexta-feira',
  sabado: 'Sábado',
};
