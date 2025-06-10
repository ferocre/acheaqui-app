// app/estabelecimento/[id].tsx (ou caminho correspondente)
import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

// Mock de dados do estabelecimento — substitua pelo real
const estabelecimento = {
  nome: 'Pizzaria Napoli',
  categoria: 'Alimentação',
  logoUrl: '', // ← Deixe em branco para testar o ícone de fallback
  nota: 4.8,
  bairro: 'Moema',
  descricao: 'Deliciosas pizzas artesanais com ingredientes frescos.',
  tags: ['aberto', 'pix', 'wifi'],
};

const categoriaIcons = {
  Alimentação: { icon: 'utensils', color: '#f50057' },
  Beleza: { icon: 'spa', color: '#e91e63' },
  Fitness: { icon: 'dumbbell', color: '#42a5f5' },
  Moda: { icon: 'tshirt', color: '#9c27b0' },
  Serviços: { icon: 'briefcase', color: '#fbc02d' },
  Pets: { icon: 'paw', color: '#ff9800' },
  Tecnologia: { icon: 'laptop', color: '#009688' },
  Saúde: { icon: 'heartbeat', color: '#00bfa5' },
  default: { icon: 'store', color: '#ccc' },
};

const DetalheEstabelecimento = () => {
  const categoriaInfo =
    categoriaIcons[estabelecimento.categoria] || categoriaIcons.default;

  const renderLogo = () => {
    if (estabelecimento.logoUrl) {
      return (
        <Image
          source={{ uri: estabelecimento.logoUrl }}
          style={styles.logo}
        />
      );
    }

    return (
      <View style={[styles.logoFallback, { backgroundColor: categoriaInfo.color }]}>
        <FontAwesome5 name={categoriaInfo.icon} size={20} color="#fff" />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        {renderLogo()}
        <Text style={styles.nome}>{estabelecimento.nome}</Text>
      </View>

      <Text style={styles.categoria}>
        {estabelecimento.categoria} • {estabelecimento.nota} ⭐
      </Text>

      <Text style={styles.bairro}>📍 {estabelecimento.bairro}</Text>

      <Text style={styles.descricao}>{estabelecimento.descricao}</Text>

      <View style={styles.tags}>
        {estabelecimento.tags.map((tag, i) => (
          <Text key={i} style={styles.tag}>{tag}</Text>
        ))}
      </View>
    </View>
  );
};

export default DetalheEstabelecimento;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  logo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 12,
  },
  logoFallback: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  nome: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1c1c1e',
  },
  categoria: {
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  bairro: {
    fontSize: 14,
    color: '#999',
    marginBottom: 12,
  },
  descricao: {
    fontSize: 15,
    color: '#444',
    marginBottom: 20,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#4361ee',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    fontSize: 12,
  },
});
