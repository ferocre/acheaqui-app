import { ScrollView, StyleSheet, Text } from 'react-native';
import DadosNegocio from './DadosNegocio';
import DestaquesEspeciais from './DestaquesEspeciais';
import EnderecoCampos from './EnderecoCampos';
import FaixaPrecoEFormasPagamento from './FaixaPrecoEFormasPagamento';
import HorariosFuncionamento from './HorariosFuncionamento';
import ModalidadesAtendimento from './ModalidadesAtendimento';
import RedesSociais from './RedesSociais';
import UploadImagens from './UploadImagens';

export default function CadastroEstabelecimento() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titulo}>Cadastro do Estabelecimento</Text>
      <DadosNegocio />
      <UploadImagens />
      <RedesSociais />
      <ModalidadesAtendimento />
      <FaixaPrecoEFormasPagamento />
      <DestaquesEspeciais />
      <HorariosFuncionamento />
      <EnderecoCampos />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 60,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1c1c1e',
  },
});