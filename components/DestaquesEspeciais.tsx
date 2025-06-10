// src/components/DestaquesEspeciais.tsx

import { Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { destaquesEspeciais, getDestaquesPorCategoriaOtimizado } from '../src/utils/destaquesEspeciais';

interface Props {
  selecionados: string[];
  onChange: (novos: string[]) => void;
  categoriaAtual?: string;
}

const iconMap: Record<string, React.ReactNode> = {
  paw: <FontAwesome5 name="paw" size={16} color="#333" />,
  wifi: <Feather name="wifi" size={16} color="#333" />,
  wheelchair: <MaterialCommunityIcons name="wheelchair-accessibility" size={16} color="#333" />,
  camera: <Feather name="camera" size={16} color="#333" />,
  baby: <FontAwesome5 name="baby" size={16} color="#333" />,
  laptop: <Feather name="monitor" size={16} color="#333" />,
  calendar: <Feather name="calendar" size={16} color="#333" />,
  truck: <Feather name="truck" size={16} color="#333" />,
  leaf: <FontAwesome5 name="leaf" size={16} color="#333" />,
  'bread-slice': <FontAwesome5 name="bread-slice" size={16} color="#333" />,
  cheese: <FontAwesome5 name="cheese" size={16} color="#333" />,
  'user-plus': <Feather name="user-plus" size={16} color="#333" />,
  users: <Feather name="users" size={16} color="#333" />,
  cross: <FontAwesome5 name="cross" size={16} color="#333" />,
  sun: <Feather name="sun" size={16} color="#333" />,
};

const DestaquesEspeciais: React.FC<Props> = ({ selecionados, onChange, categoriaAtual }) => {
  const destaquesFiltrados = useMemo(() => {
    return categoriaAtual
      ? getDestaquesPorCategoriaOtimizado(categoriaAtual)
      : destaquesEspeciais;
  }, [categoriaAtual]);

  const alternarDestaque = (id: string) => {
    const novosSelecionados = selecionados.includes(id)
      ? selecionados.filter((item) => item !== id)
      : [...selecionados, id];
    onChange(novosSelecionados);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Destaques</Text>
      <View style={styles.chipContainer}>
        {destaquesFiltrados.map((destaque, index) => {
          const selecionado = selecionados.includes(destaque.id);
          return (
            <Animatable.View
              animation="fadeInUp"
              delay={index * 70}
              duration={400}
              key={destaque.id}
              useNativeDriver
            >
              <TouchableOpacity
                style={[
                  styles.chip,
                  selecionado && styles.chipSelecionado,
                ]}
                onPress={() => alternarDestaque(destaque.id)}
                activeOpacity={0.7}
                accessibilityLabel={destaque.nome}
                accessibilityRole="button"
                accessibilityState={{ selected: selecionado }}
              >
                {iconMap[destaque.icone] && (
                  <View style={styles.icone}>{iconMap[destaque.icone]}</View>
                )}
                <Text style={[styles.chipTexto, selecionado && styles.chipTextoSelecionado]}>
                  {destaque.nome}
                </Text>
              </TouchableOpacity>
            </Animatable.View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  titulo: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 10,
    color: '#111',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#f1f3f5',
    borderRadius: 24,
    marginRight: 8,
    marginBottom: 10,
  },
  chipSelecionado: {
    backgroundColor: '#4361ee',
  },
  chipTexto: {
    marginLeft: 6,
    color: '#333',
    fontWeight: '500',
    fontSize: 14,
  },
  chipTextoSelecionado: {
    color: '#fff',
  },
  icone: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DestaquesEspeciais;
