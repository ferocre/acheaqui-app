import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getNomeDoPlanoAtual, getRecursosDoPlano } from '../../src/services/PlanosServicesMock';
import AlertaPlanoLimitado from '../AlertaPlanoLimitado';

type Props = {
  selecionadas: string[];
  onChange: (modalidades: string[]) => void;
};

const OPCOES = ['Presencial', 'Delivery', 'Online'];

export default function ModalidadesAtendimento({ selecionadas, onChange }: Props) {
  const recursos = getRecursosDoPlano();
  const nomePlano = getNomeDoPlanoAtual();
  const podeSelecionar = recursos?.podeSelecionarModalidades;

  const toggle = (opcao: string) => {
    if (!podeSelecionar) return;
    if (selecionadas.includes(opcao)) {
      onChange(selecionadas.filter((item) => item !== opcao));
    } else {
      onChange([...selecionadas, opcao]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Modalidades de atendimento *</Text>

      {!podeSelecionar && (
        <AlertaPlanoLimitado
          tipo="recurso"
          mensagem="selecionar modalidades de atendimento"
          nomePlano={nomePlano}
        />
      )}

      <View style={styles.opcoesContainer}>
        {OPCOES.map((opcao) => (
          <TouchableOpacity
            key={opcao}
            style={[
              styles.opcao,
              selecionadas.includes(opcao) && styles.opcaoSelecionada,
            ]}
            onPress={() => toggle(opcao)}
            disabled={!podeSelecionar}
          >
            <Ionicons
              name={selecionadas.includes(opcao) ? 'checkmark-circle' : 'ellipse-outline'}
              size={20}
              color={selecionadas.includes(opcao) ? '#4f46e5' : '#888'}
              style={{ marginRight: 8 }}
            />
            <Text style={[
              styles.texto,
              selecionadas.includes(opcao) && { fontWeight: 'bold' } // Correção aplicada aqui
            ]}>
              {opcao}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 8,
  },
  opcoesContainer: {
    flexDirection: 'column',
    gap: 12,
  },
  opcao: {
    flexDirection: 'row',
    alignItems: 'center',
    opacity: 1,
  },
  opcaoSelecionada: {
    // Removido o fontWeight (não é mais necessário aqui)
  },
  texto: {
    fontSize: 15,
    color: '#333',
  },
});