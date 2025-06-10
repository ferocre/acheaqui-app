// src/components/OrdenacaoResultados.tsx

import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    FlatList,
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const opcoesOrdenacao = [
  { id: 'avaliacao', label: 'Mais bem avaliados' },
  { id: 'proximidade', label: 'Mais próximos' },
  { id: 'preco', label: 'Mais baratos' },
  { id: 'recentes', label: 'Mais recentes' },
  { id: 'recomendados', label: 'Recomendados' },
];

interface Props {
  valorAtual: string;
  onSelecionar: (id: string) => void;
}

const OrdenacaoResultados: React.FC<Props> = ({ valorAtual, onSelecionar }) => {
  const [modalVisivel, setModalVisivel] = useState(false);

  const atual = opcoesOrdenacao.find((o) => o.id === valorAtual)?.label || 'Ordenar por';

  const selecionar = (id: string) => {
    onSelecionar(id);
    setModalVisivel(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.botao} onPress={() => setModalVisivel(true)}>
        <Feather name="filter" size={16} color="#4361ee" />
        <Text style={styles.texto}>{atual}</Text>
        <Feather name="chevron-down" size={16} color="#4361ee" />
      </TouchableOpacity>

      <Modal
        visible={modalVisivel}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modal}>
            <Text style={styles.titulo}>Ordenar resultados por</Text>
            <FlatList
              data={opcoesOrdenacao}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.opcao}
                  onPress={() => selecionar(item.id)}
                >
                  <Text
                    style={[
                      styles.opcaoTexto,
                      item.id === valorAtual && styles.opcaoSelecionada,
                    ]}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity onPress={() => setModalVisivel(false)} style={styles.cancelar}>
              <Text style={styles.cancelarTexto}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  botao: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eef1f4',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },
  texto: {
    marginHorizontal: 8,
    color: '#4361ee',
    fontWeight: '600',
    fontSize: 14,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
  },
  titulo: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1c1c1e',
  },
  opcao: {
    paddingVertical: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  opcaoTexto: {
    fontSize: 15,
    color: '#333',
  },
  opcaoSelecionada: {
    color: '#4361ee',
    fontWeight: '700',
  },
  cancelar: {
    marginTop: 12,
    alignItems: 'center',
  },
  cancelarTexto: {
    color: '#4361ee',
    fontWeight: '600',
  },
});

export default OrdenacaoResultados;
