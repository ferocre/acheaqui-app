import { Feather } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { getNomeDoPlanoAtual, getRecursosDoPlano } from '../../src/services/PlanosServicesMock';
import { destaquesEspeciais, getDestaquesPorCategoriaOtimizado } from '../../src/utils/destaquesEspeciais';
import iconMap from '../../src/utils/iconMapDestaques';
import AlertaPlanoLimitado from '../AlertaPlanoLimitado';


interface Props {
  selecionados: string[];
  onChange: (novos: string[]) => void;
  categoriaAtual?: string;
}

const DestaquesEspeciais: React.FC<Props> = ({ selecionados, onChange, categoriaAtual }) => {
  const recursos = getRecursosDoPlano();
  const nomePlano = getNomeDoPlanoAtual();

  const podeUsar = recursos?.podeSelecionarDestaques;
  const limite = recursos?.maxDestaquesEspeciais ?? 0;
  const limiteAtingido = selecionados.length >= limite;

  const destaquesFiltrados = useMemo(() => {
    return categoriaAtual
      ? getDestaquesPorCategoriaOtimizado(categoriaAtual)
      : destaquesEspeciais;
  }, [categoriaAtual]);

  const alternarDestaque = (id: string) => {
    if (!podeUsar) return;

    const jaSelecionado = selecionados.includes(id);
    const novos = jaSelecionado
      ? selecionados.filter((item) => item !== id)
      : [...selecionados, id];

    if (!jaSelecionado && limiteAtingido) return;
    onChange(novos);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Destaques</Text>

      {!podeUsar && (
        <AlertaPlanoLimitado
          tipo="recurso"
          mensagem="selecionar destaques especiais"
          nomePlano={nomePlano}
        />
      )}

      {podeUsar && limiteAtingido && (
        <AlertaPlanoLimitado
          tipo="limite"
          mensagem={`máximo de ${limite} destaques especiais`}
          nomePlano={nomePlano}
        />
      )}

      <View style={styles.chipContainer}>
        {destaquesFiltrados.map((destaque, index) => {
          const selecionado = selecionados.includes(destaque.id);
          const bloqueado = !selecionado && limiteAtingido;

          return (
            <Animatable.View
              animation="fadeInUp"
              delay={index * 50}
              duration={400}
              key={destaque.id}
              useNativeDriver
            >
              <TouchableOpacity
                style={[
                  styles.chip,
                  selecionado && styles.chipSelecionado,
                  bloqueado && styles.chipBloqueado,
                ]}
                onPress={() => alternarDestaque(destaque.id)}
                activeOpacity={bloqueado ? 1 : 0.7}
              >
                <View style={styles.icone}>
                  {iconMap[destaque.icone]?.() || <Feather name="star" size={16} color="#555" />}
                </View>
                <Text
                  style={[
                    styles.chipTexto,
                    selecionado && styles.chipTextoSelecionado,
                    bloqueado && styles.chipTextoBloqueado,
                  ]}
                >
                  {destaque.nome}
                </Text>
              </TouchableOpacity>
            </Animatable.View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
    marginHorizontal: 16,
  },
  titulo: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 10,
    color: '#111',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 8,
    backgroundColor: '#f1f3f5',
    borderRadius: 24,
    marginRight: 8,
    marginBottom: 10,
  },
  chipSelecionado: {
    backgroundColor: '#4361ee',
  },
  chipBloqueado: {
    opacity: 0.4,
  },
  chipTexto: {
    marginLeft: 6,
    color: '#333',
    fontWeight: '500',
    fontSize: 14,
  },
  chipTextoSelecionado: {
    color: '#fff',
  },
  chipTextoBloqueado: {
    color: '#999',
  },
  icone: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DestaquesEspeciais;
