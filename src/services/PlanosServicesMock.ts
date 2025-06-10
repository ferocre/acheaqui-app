type TipoPlano = 'basico' | 'essencial' | 'premium';

interface RecursosPlano {
  podeAdicionarRedesSociais: boolean;
  maxRedesSociais: number;
  podeAdicionarImagens: boolean;
  maxImagens: number;
  podeEditarDiasFuncionamento: boolean;
  podeEditarHorarios: boolean;
  podeFuncionamento24h: boolean;
  podeSelecionarModalidades: boolean;
  podeSelecionarDestaques: boolean;
  maxDestaquesEspeciais: number;
  podeExibirCoordenadas: boolean;
  podeLinkSite: boolean;
  podeSelecionarCategoriasPremium: boolean;
  podeEscolherFaixaPreco: boolean;
  podeSelecionarFormasPagamento: boolean;
  podeMarcarDestaquesEspeciais: boolean;
  podeInformarDocumentoContratante: boolean;
}

interface Plano {
  nome: string;
  preco: string;
  recursos: RecursosPlano;
}

interface PlanosMock {
  basico: Plano;
  essencial: Plano;
  premium: Plano;
}

let planoAtual: TipoPlano = 'essencial'; 

export const planosMock: PlanosMock = {
  basico: {
    nome: "Básico",
    preco: "Gratuito",
    recursos: {
      podeAdicionarRedesSociais: true,
      maxRedesSociais: 1,
      podeAdicionarImagens: true,
      maxImagens: 2,
      podeEditarDiasFuncionamento: false,
      podeEditarHorarios: false,
      podeFuncionamento24h: false, 
      podeSelecionarModalidades: false,
      podeSelecionarDestaques: false,
      maxDestaquesEspeciais: 0,
      podeExibirCoordenadas: false,
      podeLinkSite: false,
      podeSelecionarCategoriasPremium: false,
      podeEscolherFaixaPreco: false,
      podeSelecionarFormasPagamento: false,
      podeMarcarDestaquesEspeciais: false,
      podeInformarDocumentoContratante: false,
    },
  },
  essencial: {
    nome: "Essencial",
    preco: "R$19,90",
    recursos: {
      podeAdicionarRedesSociais: true,
      maxRedesSociais: 3,
      podeAdicionarImagens: true,
      maxImagens: 3,
      podeEditarDiasFuncionamento: true,
      podeEditarHorarios: true,
      podeFuncionamento24h: true,       
      podeSelecionarModalidades: true,
      podeSelecionarDestaques: true,
      maxDestaquesEspeciais: 3,
      podeExibirCoordenadas: true,
      podeLinkSite: true,
      podeSelecionarCategoriasPremium: true,
      podeEscolherFaixaPreco: true,
      podeSelecionarFormasPagamento: true,
      podeMarcarDestaquesEspeciais: true,
      podeInformarDocumentoContratante: true,
    },
  },
  premium: {
    nome: "Premium",
    preco: "R$39,90",
    recursos: {
      podeAdicionarRedesSociais: true,
      maxRedesSociais: 5,
      podeAdicionarImagens: true,
      maxImagens: 5,
      podeEditarDiasFuncionamento: true,
      podeEditarHorarios: true,
      podeFuncionamento24h: true,       
      podeSelecionarModalidades: true,
      maxDestaquesEspeciais: 5,
      podeSelecionarDestaques: true,
      podeExibirCoordenadas: true,
      podeLinkSite: true,
      podeSelecionarCategoriasPremium: true,
      podeEscolherFaixaPreco: true,
      podeSelecionarFormasPagamento: true,
      podeMarcarDestaquesEspeciais: true,
      podeInformarDocumentoContratante: true,
    },
  },
};

export const getPlanoAtual = (): TipoPlano => planoAtual;

export const setPlanoAtual = (novoPlano: TipoPlano): void => {
  if (planosMock[novoPlano]) {
    planoAtual = novoPlano;
  } else {
    console.warn(`Plano '${novoPlano}' inválido.`);
  }
};

export const getRecursosDoPlano = (): RecursosPlano => {
  return planosMock[planoAtual].recursos;
};

export const getNomeDoPlanoAtual = (): string => {
  return planosMock[planoAtual].nome;
};

export const getTodosPlanos = (): PlanosMock => planosMock;

// Exportando os tipos para uso externo
export type { Plano, PlanosMock, RecursosPlano, TipoPlano };

