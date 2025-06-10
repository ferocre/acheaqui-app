import { FontAwesome5, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, View } from 'react-native';
import { getIconeCategoria } from '../src/utils/iconesPorCategoria';

type Props = {
  categoria: string;
  size?: number;
};

type IconeCategoria = {
  nome: string;
  biblioteca: 'MaterialCommunityIcons' | 'FontAwesome5' | 'MaterialIcons';
};

export default function LogoCategoriaPadrao({ categoria, size = 48 }: Props) {
  const { cor, icone }: { cor: string; icone: IconeCategoria } = getIconeCategoria(categoria);

  const renderIcone = () => {
    const props = { name: icone.nome as any, size: Math.max(18, size * 0.5), color: '#fff' };

    switch (icone.biblioteca) {
      case 'MaterialCommunityIcons':
        return <MaterialCommunityIcons {...props} />;
      case 'FontAwesome5':
        return <FontAwesome5 {...props} />;
      case 'MaterialIcons':
        return <MaterialIcons {...props} />;
      default:
        return null;
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: cor,
          width: size,
          height: size,
          borderRadius: size / 2,
        },
      ]}
    >
      {renderIcone()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
