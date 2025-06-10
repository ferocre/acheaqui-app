// src/components/CategoriasPopulares.tsx

import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface Props {
  bairroFiltro: string;
  avaliacaoMin: string;
  abertoAgora: boolean;
}

const categorias = [
  {
    nome: 'Alimentação',
    icone: <MaterialCommunityIcons name="silverware-fork-knife" size={20} color="#fff" />,
    cor: '#e63946',
  },
  {
    nome: 'Beleza',
    icone: <FontAwesome5 name="kiss-wink-heart" size={20} color="#fff" />,
    cor: '#f78fb3',
  },
  {
    nome: 'Saúde',
    icone: <FontAwesome5 name="heartbeat" size={20} color="#fff" />,
    cor: '#38ada9',
  },
  {
    nome: 'Fitness',
    icone: <FontAwesome5 name="dumbbell" size={20} color="#fff" />,
    cor: '#60a3bc',
  },
  {
    nome: 'Moda',
    icone: <FontAwesome5 name="tshirt" size={20} color="#fff" />,
    cor: '#9b59b6',
  },
  {
    nome: 'Serviços',
    icone: <FontAwesome5 name="briefcase" size={20} color="#fff" />,
    cor: '#f6b93b',
  },
  {
    nome: 'Pets',
    icone: <FontAwesome5 name="dog" size={20} color="#fff" />,
    cor: '#fa983a',
  },
  {
    nome: 'Tecnologia',
    icone: <FontAwesome5 name="laptop" size={20} color="#fff" />,
    cor: '#10ac84',
  },
];

export default function CategoriasPopulares({
  bairroFiltro,
  avaliacaoMin,
  abertoAgora,
}: Props) {
  const router = useRouter();

  const navegarParaCategoria = (categoria: string) => {
    const query = new URLSearchParams({
      categoria,
      bairro: bairroFiltro,
      avaliacaoMin: avaliacaoMin || '',
      abertoAgora: abertoAgora ? 'true' : 'false',
    }).toString();

    router.push(`/resultados?${query}`);
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.titulo}>Categorias populares</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scroll}
      >
        {categorias.map((categoria) => (
          <TouchableOpacity
            key={categoria.nome}
            onPress={() => navegarParaCategoria(categoria.nome)}
            style={[styles.card, { backgroundColor: categoria.cor }]}
            activeOpacity={0.85}
          >
            <View style={styles.icone}>{categoria.icone}</View>
            <Text style={styles.label}>{categoria.nome}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 16,
    marginHorizontal: 16,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  titulo: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 12,
    color: '#1c1c1e',
  },
  scroll: {
    flexDirection: 'row',
    paddingVertical: 4,
  },
  card: {
    height: 80,
    width: 100,
    marginRight: 12,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 4,
  },
  icone: {
    marginBottom: 4,
  },
  label: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 13,
    textAlign: 'center',
  },
});
