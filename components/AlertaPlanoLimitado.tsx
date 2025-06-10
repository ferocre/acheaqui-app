import { StyleSheet, Text, View } from 'react-native';

type Props = {
  tipo?: 'recurso' | 'limite';
  mensagem?: string;
  nomePlano?: string;
  onUpgrade?: () => void; 
};

export default function AlertaPlanoLimitado({
  tipo = 'recurso',
  mensagem = 'acessar este recurso',
  nomePlano = 'Básico',
}: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.texto}>
        {tipo === 'recurso'
          ? `Seu plano atual (${nomePlano}) não permite ${mensagem}.`
          : `Limite do plano ${nomePlano} atingido: ${mensagem}.`}
      </Text>
      <Text style={styles.link}>⤴️ Faça upgrade para liberar</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff3cd',
    borderColor: '#ffeeba',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  texto: {
    color: '#856404',
    fontSize: 14,
  },
  link: {
    color: '#d9480f',
    fontWeight: 'bold',
    marginTop: 4,
    fontSize: 14,
  },
});
