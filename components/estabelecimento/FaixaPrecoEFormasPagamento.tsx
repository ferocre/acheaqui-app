import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getNomeDoPlanoAtual, getRecursosDoPlano } from '../../src/services/PlanosServicesMock';
import AlertaPlanoLimitado from '../AlertaPlanoLimitado';

type Props = {
  faixaPreco: string;
  onChangeFaixaPreco: (valor: string) => void;
  formasPagamento: string[];
  onChangeFormasPagamento: (lista: string[]) => void;
};

const OPCOES_FAIXA_PRECO = ['Até R$ 20', 'R$ 21 a R$ 50', 'R$ 51 a R$ 100', 'Mais de R$ 100'];
const OPCOES_PAGAMENTO = ['Pix', 'Dinheiro', 'Cartão de Crédito', 'Cartão de Débito'];

export default function FaixaPrecoEFormasPagamento({
  faixaPreco,
  onChangeFaixaPreco,
  formasPagamento,
  onChangeFormasPagamento,
}: Props) {
  const [recursos, setRecursos] = useState<any>({});
  const [planoNome, setPlanoNome] = useState<string>('Básico');

  useEffect(() => {
    setRecursos(getRecursosDoPlano());
    setPlanoNome(getNomeDoPlanoAtual());
  }, []);

  const togglePagamento = (opcao: string) => {
    if (!recursos.podeSelecionarFormasPagamento) return;

    if (formasPagamento.includes(opcao)) {
      onChangeFormasPagamento(formasPagamento.filter((item) => item !== opcao));
    } else {
      onChangeFormasPagamento([...formasPagamento, opcao]);
    }
  };

  return (
    <View style={styles.container}>
      {/* Faixa de Preço */}
      <Text style={styles.label}>Faixa de preço (ticket médio)</Text>
      {!recursos.podeEscolherFaixaPreco && (
        <AlertaPlanoLimitado
          tipo="recurso"
          mensagem="selecionar a faixa de preço"
          nomePlano={planoNome}
        />
      )}
      <View style={styles.opcoesColuna}>
        {OPCOES_FAIXA_PRECO.map((opcao) => (
          <TouchableOpacity
            key={opcao}
            style={styles.opcaoLinha}
            onPress={() => recursos.podeEscolherFaixaPreco && onChangeFaixaPreco(opcao)}
          >
            <Ionicons
              name={faixaPreco === opcao ? 'radio-button-on' : 'radio-button-off'}
              size={20}
              color={faixaPreco === opcao ? '#4f46e5' : '#888'}
              style={{ marginRight: 8 }}
            />
            <Text style={[styles.texto, !recursos.podeEscolherFaixaPreco && styles.bloqueado]}>
              {opcao}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Formas de Pagamento */}
      <Text style={[styles.label, { marginTop: 20 }]}>Formas de pagamento *</Text>
      {!recursos.podeSelecionarFormasPagamento && (
        <AlertaPlanoLimitado
          tipo="recurso"
          mensagem="marcar formas de pagamento"
          nomePlano={planoNome}
        />
      )}
      <View style={styles.opcoesColuna}>
        {OPCOES_PAGAMENTO.map((opcao) => (
          <TouchableOpacity
            key={opcao}
            style={styles.opcaoLinha}
            onPress={() => togglePagamento(opcao)}
          >
            <Ionicons
              name={formasPagamento.includes(opcao) ? 'checkmark-circle' : 'ellipse-outline'}
              size={20}
              color={formasPagamento.includes(opcao) ? '#4f46e5' : '#888'}
              style={{ marginRight: 8 }}
            />
            <Text style={[styles.texto, !recursos.podeSelecionarFormasPagamento && styles.bloqueado]}>
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
    marginBottom: 28,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 10,
  },
  opcoesColuna: {
    flexDirection: 'column',
    gap: 12,
  },
  opcaoLinha: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  texto: {
    fontSize: 15,
    color: '#333',
  },
  bloqueado: {
    color: '#aaa',
  },
});
