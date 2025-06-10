import React, { useState } from 'react';
import {
  FlatList,
  Keyboard,
  Modal,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

interface Props {
  bairro: string;
  onBairroChange: (v: string) => void;
  avaliacaoMin: string;
  onAvaliacaoChange: (v: string) => void;
  abertoAgora: boolean;
  onToggleAberto: () => void;
}

const opcoesAvaliacao = ['5.0', '4.9', '4.8', '4.7', '4.5', '4.0', '3.5', '3.0'];
const bairrosDisponiveis = [
  'Centro', 'Jardins', 'Moema', 'Itaim Bibi', 'Pinheiros',
  'Vila Madalena', 'Brooklin', 'Tatuapé', 'Santana', 'Liberdade',
];

const FiltrosRapidos: React.FC<Props> = ({
  bairro,
  onBairroChange,
  avaliacaoMin,
  onAvaliacaoChange,
  abertoAgora,
  onToggleAberto,
}) => {
  const [modalVisivel, setModalVisivel] = useState(false);
  const [bairrosFiltrados, setBairrosFiltrados] = useState<string[]>([]);

  const handleBairroChange = (texto: string) => {
    onBairroChange(texto);
    if (texto.length > 0) {
      const filtrados = bairrosDisponiveis.filter((b) =>
        b.toLowerCase().includes(texto.toLowerCase())
      );
      setBairrosFiltrados(filtrados);
    } else {
      setBairrosFiltrados([]);
    }
  };

  const selecionarBairro = (b: string) => {
    onBairroChange(b);
    setBairrosFiltrados([]);
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Filtros rápidos</Text>

      <View>
        <TextInput
          placeholder="Bairro"
          placeholderTextColor="#888"
          style={styles.input}
          value={bairro}
          onChangeText={handleBairroChange}
        />
        {bairrosFiltrados.length > 0 && (
          <View style={styles.dropdown}>
            {bairrosFiltrados.map((b) => (
              <TouchableOpacity
                key={b}
                onPress={() => selecionarBairro(b)}
                style={styles.dropdownItem}
              >
                <Text style={styles.dropdownText}>{b}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <TouchableOpacity
        style={styles.inputTouchable}
        onPress={() => setModalVisivel(true)}
      >
        <Text style={styles.inputTouchableTexto}>
          Avaliação mínima: {avaliacaoMin || 'Selecionar'}
        </Text>
      </TouchableOpacity>

      <View style={styles.switchContainer}>
        <Text style={styles.switchLabel}>Aberto agora</Text>
        <Switch
          trackColor={{ false: '#ccc', true: '#4361ee' }}
          thumbColor="#fff"
          ios_backgroundColor="#ccc"
          onValueChange={onToggleAberto}
          value={abertoAgora}
        />
      </View>

      {/* Modal de avaliação mínima */}
      <Modal
        visible={modalVisivel}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisivel(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitulo}>Escolher avaliação mínima</Text>
            <FlatList
              data={opcoesAvaliacao}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.opcao}
                  onPress={() => {
                    onAvaliacaoChange(item);
                    setModalVisivel(false);
                  }}
                >
                  <Text style={styles.opcaoTexto}>{item} ⭐</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.fechar}
              onPress={() => setModalVisivel(false)}
            >
              <Text style={styles.fecharTexto}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
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
    marginBottom: 10,
    color: '#1c1c1e',
  },
  input: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    marginBottom: 6,
    color: '#1c1c1e',
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 10,
  },
  dropdownItem: {
    paddingVertical: 8,
  },
  dropdownText: {
    fontSize: 14,
    color: '#333',
  },
  inputTouchable: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 10,
  },
  inputTouchableTexto: {
    fontSize: 14,
    color: '#444',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    marginBottom: 10,
  },
  switchLabel: {
    fontSize: 14,
    color: '#1c1c1e',
    fontWeight: '500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    maxHeight: '60%',
  },
  modalTitulo: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#333',
  },
  opcao: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  opcaoTexto: {
    fontSize: 16,
    color: '#222',
  },
  fechar: {
    marginTop: 12,
    alignItems: 'center',
  },
  fecharTexto: {
    color: '#4361ee',
    fontWeight: '600',
  },
});

export default FiltrosRapidos;
