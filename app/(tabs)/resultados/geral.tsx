import { useLocalSearchParams } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import DestaquesEspeciais from '../../../components/DestaquesEspeciais';
import LogoCategoriaPadrao from '../../../components/LogoCategoriaPadrao';

type Estabelecimento = {
  id: string;
  nome: string;
  categoria: string;
  nota: number;
  bairro: string;
  tags: string[];
  plano: 'Básico' | 'Essencial' | 'Premium';
  logoUrl?: string;
};

const MOCK_ESTABELECIMENTOS: Estabelecimento[] = [
  {
    id: '1',
    nome: 'Pizzaria Napoli',
    categoria: 'Alimentação',
    nota: 4.8,
    bairro: 'Moema',
    tags: ['aberto', 'pix', 'wifi'],
    plano: 'Premium',
    logoUrl: '',
  },
  {
    id: '2',
    nome: 'Studio Fitness Pro',
    categoria: 'Academia',
    nota: 4.7,
    bairro: 'Jardins',
    tags: ['wifi', 'pet', 'plus'],
    plano: 'Essencial',
    logoUrl: '',
  },
  {
    id: '3',
    nome: 'Salão Bela Mulher',
    categoria: 'Beleza',
    nota: 4.9,
    bairro: 'Moema',
    tags: ['frete', 'online', 'wifi'],
    plano: 'Básico',
    logoUrl: '',
  },
];

function normalize(text: string) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}

export default function ResultadosGeral() {
  const params = useLocalSearchParams();
  const { busca, bairro, avaliacao, aberto } = params;

  const [destaquesSelecionados, setDestaquesSelecionados] = useState<string[]>([]);

  const resultadosFiltrados = useMemo(() => {
    return MOCK_ESTABELECIMENTOS.filter((item) => {
      const notaOk = avaliacao ? item.nota >= parseFloat(avaliacao.toString()) : true;
      const bairroOk = bairro ? normalize(item.bairro) === normalize(bairro.toString()) : true;
      const abertoOk = aberto === 'true' ? item.tags.includes('aberto') : true;
      const destaquesOk = destaquesSelecionados.length === 0
        ? true
        : destaquesSelecionados.every((d) => item.tags.includes(d));

      return notaOk && bairroOk && abertoOk && destaquesOk;
    });
  }, [avaliacao, bairro, aberto, destaquesSelecionados]);

  const renderEstabelecimento = ({ item, index }: { item: Estabelecimento; index: number }) => (
    <Animatable.View
      animation="fadeInUp"
      delay={index * 100}
      duration={400}
      useNativeDriver
      style={styles.card}
    >
      <View style={styles.headerCard}>
        <View style={styles.logoArea}>
          {item.logoUrl ? (
            <Image source={{ uri: item.logoUrl }} style={styles.logo} />
          ) : (
            <LogoCategoriaPadrao categoria={item.categoria} size={48} />
          )}
        </View>

        <View style={{ flex: 1 }}>
          <View style={styles.topoInfo}>
            <Text style={styles.nome}>{item.nome}</Text>
            {item.plano !== 'Básico' && (
              <Text
                style={[
                  styles.seloPlano,
                  item.plano === 'Premium' ? styles.seloPremium : styles.seloEssencial,
                ]}
              >
                {item.plano}
              </Text>
            )}
          </View>

          <Text style={styles.categoria}>{item.categoria} • {item.nota} ⭐</Text>
          <Text style={styles.bairro}>{item.bairro}</Text>

          <View style={styles.tags}>
            {item.tags.map((tag, i) => (
              <Text key={i} style={styles.tag}>{tag}</Text>
            ))}
          </View>
        </View>
      </View>
    </Animatable.View>
  );

  return (
    <FlatList
      data={resultadosFiltrados}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 16, paddingBottom: 60 }}
      ListHeaderComponent={
        <View>
          <Text style={styles.titulo}>Resultados encontrados</Text>

          <View style={styles.filtrosResumo}>
            {bairro && <Text style={styles.filtroAtivo}>📍 {bairro}</Text>}
            {avaliacao && <Text style={styles.filtroAtivo}>⭐ {avaliacao}+</Text>}
            {aberto === 'true' && <Text style={styles.filtroAtivo}>🟢 Aberto agora</Text>}
          </View>

          <DestaquesEspeciais
            selecionados={destaquesSelecionados}
            onChange={setDestaquesSelecionados}
          />

          {resultadosFiltrados.length === 0 && (
            <Text style={styles.nenhum}>
              Nenhum resultado encontrado com os filtros aplicados.
            </Text>
          )}
        </View>
      }
      renderItem={renderEstabelecimento}
    />
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 16,
    color: '#1c1c1e',
  },
  filtrosResumo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
    gap: 10,
  },
  filtroAtivo: {
    backgroundColor: '#eef1f5',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 16,
    fontSize: 13,
    color: '#333',
  },
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
    gap: 12,
  },
  logoArea: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#eee',
    overflow: 'hidden',
  },
  logo: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  topoInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nome: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1c1c1e',
    flex: 1,
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
    textTransform: 'capitalize',
  },
  nenhum: {
    textAlign: 'center',
    color: '#666',
    marginTop: 30,
    fontSize: 15,
  },
});
