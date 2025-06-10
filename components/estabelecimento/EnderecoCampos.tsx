import { StyleSheet, Text, TextInput, View } from 'react-native';

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

type Props = {
  form: EnderecoProps;
  onChange: (value: EnderecoProps) => void;
};

export default function EnderecoCampos({ form, onChange }: Props) {
  const handleChange = (campo: keyof EnderecoProps, valor: string) => {
    onChange({ ...form, [campo]: valor });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>CEP</Text>
      <TextInput
        style={styles.input}
        value={form.cep || ''}
        onChangeText={(text) => handleChange('cep', text)}
        placeholder="00000-000"
      />

      <Text style={styles.label}>Endereço</Text>
      <TextInput
        style={styles.input}
        value={form.endereco || ''}
        onChangeText={(text) => handleChange('endereco', text)}
        placeholder="Rua, número"
      />

      <Text style={styles.label}>Bairro</Text>
      <TextInput
        style={styles.input}
        value={form.bairro || ''}
        onChangeText={(text) => handleChange('bairro', text)}
        placeholder="Nome do bairro"
      />

      <Text style={styles.label}>Cidade</Text>
      <TextInput
        style={styles.input}
        value={form.cidade}
        onChangeText={(text) => handleChange('cidade', text)}
        placeholder="Cidade"
      />

      <Text style={styles.label}>Estado</Text>
      <TextInput
        style={styles.input}
        value={form.estado}
        onChangeText={(text) => handleChange('estado', text)}
        placeholder="Estado (UF)"
      />
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
});
