import { useRouter } from 'expo-router';
import { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native';

import CategoriasPopulares from '../../components/CategoriasPopulares';
import FiltrosRapidos from '../../components/FiltrosRapidos';

export default function HomeScreen() {
  const router = useRouter();

  const [busca, setBusca] = useState('');
  const [bairroFiltro, setBairroFiltro] = useState('');
  const [avaliacaoMin, setAvaliacaoMin] = useState('');
  const [abertoAgora, setAbertoAgora] = useState(false);

  const aplicarBusca = () => {
    const params = new URLSearchParams();

    if (busca) params.append('busca', busca);
    if (bairroFiltro) params.append('bairro', bairroFiltro);
    if (avaliacaoMin) params.append('avaliacao', avaliacaoMin);
    if (abertoAgora) params.append('aberto', 'true');

    router.push(`/resultados/geral?${params.toString()}`);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles.titulo}>AcheAqui</Text>

      <TextInput
        style={styles.inputBusca}
        placeholder="Buscar comércios, serviços..."
        placeholderTextColor="#888"
        value={busca}
        onChangeText={setBusca}
      />

      <FiltrosRapidos
        bairro={bairroFiltro}
        onBairroChange={setBairroFiltro}
        avaliacaoMin={avaliacaoMin}
        onAvaliacaoChange={setAvaliacaoMin}
        abertoAgora={abertoAgora}
        onToggleAberto={() => setAbertoAgora(!abertoAgora)}
      />

      <TouchableOpacity style={styles.botaoBuscar} onPress={aplicarBusca}>
        <Text style={styles.botaoBuscarTexto}>Buscar</Text>
      </TouchableOpacity>

      <CategoriasPopulares
        bairroFiltro={bairroFiltro}
        avaliacaoMin={avaliacaoMin}
        abertoAgora={abertoAgora}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 24,
    marginBottom: 10,
  },
  inputBusca: {
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    marginBottom: 12,
  },
  botaoBuscar: {
    backgroundColor: '#4361ee',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  botaoBuscarTexto: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
