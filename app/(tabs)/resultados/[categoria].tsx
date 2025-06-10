// src/components/CategoriasPopulares.tsx

import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

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

export default function CategoriasPopulares() {
  const router = useRouter();

  const navegarParaCategoria = (categoria: string) => {
    router.push(`/resultados/${encodeURIComponent(categoria)}`);
  };

  return (
    <View style={styles.container}>
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
            activeOpacity={0.8}
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
  container: {
    marginTop: 16,
    marginHorizontal: 16,
  },
  titulo: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 10,
    color: '#111',
  },
  scroll: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  card: {
    height: 80,
    width: 100,
    marginRight: 10,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
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
