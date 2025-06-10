import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';

interface Props {
  nome: string;
  categoria: string;
  nota: number;
  bairro: string;
  plano: 'Básico' | 'Essencial' | 'Premium';
  tags: string[];
  index?: number;
}

const ResultadoCard: React.FC<Props> = ({ nome, categoria, nota, bairro, plano, tags, index = 0 }) => {
  return (
    <Animatable.View
      animation="fadeInUp"
      duration={400}
      delay={index * 100}
      useNativeDriver
      style={styles.card}
    >
      <View style={styles.headerCard}>
        <Text style={styles.nome}>{nome}</Text>
        {plano !== 'Básico' && (
          <Text
            style={[
              styles.seloPlano,
              plano === 'Premium' ? styles.seloPremium : styles.seloEssencial,
            ]}
          >
            {plano}
          </Text>
        )}
      </View>

      <Text style={styles.categoria}>
        {categoria} • {nota.toFixed(1)} ⭐
      </Text>
      <Text style={styles.bairro}>{bairro}</Text>

      <View style={styles.tags}>
        {tags.map((tag, i) => (
          <Text key={i} style={styles.tag}>
            {tag}
          </Text>
        ))}
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    padding: 18,
    borderRadius: 18,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 3,
  },
  headerCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  nome: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1c1c1e',
  },
  seloPlano: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    fontSize: 12,
    fontWeight: '600',
    overflow: 'hidden',
    textTransform: 'uppercase',
  },
  seloPremium: {
    backgroundColor: '#ff6b6b',
    color: '#fff',
  },
  seloEssencial: {
    backgroundColor: '#ffd43b',
    color: '#1c1c1e',
  },
  categoria: {
    fontSize: 14,
    color: '#555',
    marginBottom: 2,
  },
  bairro: {
    fontSize: 13,
    color: '#888',
    marginBottom: 8,
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

export default ResultadoCard;
