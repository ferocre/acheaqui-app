import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, TextInput, View, useColorScheme } from 'react-native';
import { getNomeDoPlanoAtual, getRecursosDoPlano } from '../../src/services/PlanosServicesMock';
import AlertaPlanoLimitado from '../AlertaPlanoLimitado';

export interface EnderecoProps {
  estado: string;
  cidade: string;
  bairro?: string;
  endereco?: string;
  cep?: string;
  zona?: string;
  latitude?: number;
  longitude?: number;
  comercioDigital?: boolean;
  linkLoja?: string;
}

interface EnderecoFormData extends Partial<EnderecoProps> {
  tipoNegocio?: string;
  numero?: string;
  [key: string]: any;
}

type Props = {
  form: EnderecoFormData;
  onChange: (value: EnderecoFormData) => void;
  errors?: Record<string, string>;
  formBlocked?: boolean;
};

const ufs = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO',
  'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI',
  'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
];

export default function EnderecoCampos({ form = {}, onChange, errors = {}, formBlocked = false }: Props) {
  const recursos = getRecursosDoPlano();
  const nomePlano = getNomeDoPlanoAtual();
  const [cepError, setCepError] = useState('');
  const [loadingCep, setLoadingCep] = useState(false);
  const colorScheme = useColorScheme();

  const isDigital =
    form?.tipoNegocio === 'Comércio digital (sem ponto físico)' ||
    form?.tipoNegocio === 'Serviços';

  const buscarEndereco = async (cep: string) => {
    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo.length !== 8) return;

    setLoadingCep(true);
    setCepError('');

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const data = await response.json();

      if (data.erro) {
        setCepError('CEP não encontrado.');
        return;
      }

      onChange({
        ...form,
        rua: data.logradouro || '',
        bairro: data.bairro || '',
        cidade: data.localidade || '',
        uf: data.uf || '',
        complemento: form.complemento || '',
      });
    } catch (err) {
      setCepError('Erro ao buscar o CEP.');
    } finally {
      setLoadingCep(false);
    }
  };

  const handleChange = (campo: string, valorCampo: string) => {
    onChange({ ...form, [campo]: valorCampo });

    if (campo === 'cep' && valorCampo.replace(/\D/g, '').length === 8) {
      buscarEndereco(valorCampo);
    }
  };

  const renderInput = (
    campo: string,
    label: string,
    obrigatorio: boolean = false,
    desabilitado: boolean = false,
    placeholder: string = '',
    keyboardType: 'default' | 'numeric' = 'default'
  ) => (
    <View style={styles.fieldContainer}>
      <Text style={[styles.label, colorScheme === 'dark' && { color: '#fff' }]}> 
        {label} {obrigatorio && <Text style={styles.required}>*</Text>}
      </Text>
      <TextInput
        style={[styles.input, colorScheme === 'dark' && { backgroundColor: '#1e1e1e', color: '#fff' }, errors?.[campo] && styles.inputError]}
        value={form?.[campo] ?? ''}
        onChangeText={(text) => handleChange(campo, text)}
        editable={!desabilitado && !formBlocked}
        placeholder={placeholder}
        keyboardType={keyboardType}
        maxLength={campo === 'cep' ? 9 : undefined}
        placeholderTextColor={colorScheme === 'dark' ? '#aaa' : '#999'}
      />
      {campo === 'cep' && loadingCep && <ActivityIndicator size="small" />}
      {campo === 'cep' && cepError && <Text style={styles.error}>{cepError}</Text>}
      {errors?.[campo] && !cepError && <Text style={styles.error}>{errors[campo]}</Text>}
    </View>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#121212' : '#fff' }]}>
      {!recursos.podeExibirCoordenadas && (
        <AlertaPlanoLimitado
          tipo="recurso"
          mensagem="usar o endereço completo"
          nomePlano={nomePlano}
        />
      )}

      {renderInput('cep', 'CEP', !isDigital, isDigital || loadingCep, '00000-000', 'numeric')}
      {renderInput('rua', 'Rua', !isDigital, isDigital)}
      {renderInput('numero', 'Número', !isDigital, isDigital)}
      {renderInput('complemento', 'Complemento', false, isDigital)}
      {renderInput('bairro', 'Bairro', true, isDigital)}
      {renderInput('cidade', 'Cidade', true, isDigital)}

      <View style={styles.fieldContainer}>
        <Text style={[styles.label, colorScheme === 'dark' && { color: '#fff' }]}>UF <Text style={styles.required}>*</Text></Text>
        <Picker
          selectedValue={form?.uf ?? ''}
          enabled={!formBlocked}
          onValueChange={(value) => handleChange('uf', value)}
        >
          <Picker.Item label="--" value="" />
          {ufs.map((sigla) => (
            <Picker.Item key={sigla} label={sigla} value={sigla} />
          ))}
        </Picker>
        {errors?.uf && <Text style={styles.error}>{errors.uf}</Text>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
    color: '#333',
  },
  required: {
    color: 'red',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  inputError: {
    borderColor: '#ff0000',
  },
  error: {
    color: 'red',
    marginTop: 4,
    fontSize: 12,
  },
});
