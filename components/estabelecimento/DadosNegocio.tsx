import { Picker } from '@react-native-picker/picker';
import { useEffect } from 'react';
import { StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import AlertaPlanoLimitado from '../../components/AlertaPlanoLimitado';
import { getNomeDoPlanoAtual, getRecursosDoPlano } from '../../src/services/PlanosServicesMock';
import { SUBCATEGORIAS } from '../../src/utils/subcategoriasPorCategoria';

// Interface unificada
export interface DadosNegocioProps {
  nome: string;
  tipoNegocio: 'físico' | 'digital' | 'ambos';
  categoria: string;
  subcategoria: string;
  descricao?: string;
  maiorDeIdade?: boolean;
}

type Props = {
  form: DadosNegocioProps;
  onChange: (value: DadosNegocioProps) => void;
};

export default function DadosNegocio({ form, onChange }: Props) {
  const recursosPlano = getRecursosDoPlano();
  const nomePlano = getNomeDoPlanoAtual();

  useEffect(() => {
    if (!form || !form.subcategoria) return;

    const dados = SUBCATEGORIAS[form.subcategoria];
    if (!dados) return;

    const novaCategoria = dados.categoria;
    onChange({
      ...form,
      categoria: novaCategoria,
      maiorDeIdade: novaCategoria === 'Adulto 18+',
    });
  }, [form?.subcategoria]);

  const subcategoriasPermitidas = Object.keys(SUBCATEGORIAS).filter((sub) => {
    const cat = SUBCATEGORIAS[sub].categoria;
    return recursosPlano.podeSelecionarCategoriasPremium || cat !== 'Adulto 18+';
  });

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nome do Estabelecimento *</Text>
      <TextInput
        style={styles.input}
        value={form.nome}
        onChangeText={(text) => onChange({ ...form, nome: text })}
        placeholder="Ex: Salão da Ana"
      />

      <Text style={styles.label}>Subcategoria *</Text>
      {!recursosPlano.podeSelecionarCategoriasPremium && (
        <AlertaPlanoLimitado
          tipo="recurso"
          mensagem="selecionar subcategorias premium"
          nomePlano={nomePlano}
        />
      )}
      <View style={styles.pickerWrapper}>
        <Picker
          selectedValue={form.subcategoria}
          onValueChange={(value) => onChange({ ...form, subcategoria: value })}
          style={styles.picker}
        >
          <Picker.Item label="Selecione uma subcategoria..." value="" />
          {subcategoriasPermitidas.map((sub) => (
            <Picker.Item key={sub} label={sub} value={sub} />
          ))}
        </Picker>
      </View>

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={[styles.input, styles.multiline]}
        value={form.descricao}
        onChangeText={(text) => onChange({ ...form, descricao: text })}
        placeholder="Descreva seu negócio, diferenciais, produtos e serviços..."
        multiline
        numberOfLines={4}
      />

      <View style={styles.switchRow}>
        <Text style={styles.label}>Conteúdo voltado para maiores de 18 anos</Text>
        <Switch
          value={form.maiorDeIdade}
          onValueChange={(value) => onChange({ ...form, maiorDeIdade: value })}
          disabled={form.categoria === 'Adulto 18+'}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 6,
  },
  input: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 16,
  },
  multiline: {
    textAlignVertical: 'top',
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 16,
  },
  picker: {
    height: 50,
    backgroundColor: '#fff',
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
