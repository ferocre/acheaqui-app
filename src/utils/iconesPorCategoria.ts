// utils/iconesPorCategoria.ts

export type IconeCategoria = {
  nome: string;
  cor: string;
  icone: {
    biblioteca: 'MaterialCommunityIcons' | 'FontAwesome5' | 'MaterialIcons';
    nome: string;
  };
};

/**
 * Retorna nome, cor e ícone visual padrão para a categoria informada.
 */
export function getIconeCategoria(categoria: string): IconeCategoria {
  const categoriaFormatada = categoria.toLowerCase();

  switch (categoriaFormatada) {
    case 'alimentação':
    case 'restaurante':
      return {
        nome: 'Alimentação',
        cor: '#f72585',
        icone: { biblioteca: 'MaterialCommunityIcons', nome: 'silverware-fork-knife' },
      };

    case 'beleza':
      return {
        nome: 'Beleza',
        cor: '#f9844a',
        icone: { biblioteca: 'MaterialCommunityIcons', nome: 'face-woman-shimmer' },
      };

    case 'saúde':
      return {
        nome: 'Saúde',
        cor: '#06d6a0',
        icone: { biblioteca: 'FontAwesome5', nome: 'heartbeat' },
      };

    case 'fitness':
    case 'academia':
      return {
        nome: 'Fitness',
        cor: '#4cc9f0',
        icone: { biblioteca: 'MaterialCommunityIcons', nome: 'dumbbell' },
      };

    case 'moda':
      return {
        nome: 'Moda',
        cor: '#9d4edd',
        icone: { biblioteca: 'MaterialCommunityIcons', nome: 'tshirt-crew' },
      };

    case 'serviços':
      return {
        nome: 'Serviços',
        cor: '#fcbf49',
        icone: { biblioteca: 'MaterialIcons', nome: 'work' },
      };

    case 'pets':
      return {
        nome: 'Pets',
        cor: '#f77f00',
        icone: { biblioteca: 'FontAwesome5', nome: 'dog' },
      };

    case 'tecnologia':
      return {
        nome: 'Tecnologia',
        cor: '#2a9d8f',
        icone: { biblioteca: 'MaterialIcons', nome: 'laptop' },
      };

    case 'adulto 18+':
      return {
        nome: 'Adulto 18+',
        cor: '#c1121f',
        icone: { biblioteca: 'MaterialCommunityIcons', nome: 'eye-outline' },
      };

    default:
      return {
        nome: 'Outro',
        cor: '#adb5bd',
        icone: { biblioteca: 'MaterialIcons', nome: 'category' },
      };
  }
}
