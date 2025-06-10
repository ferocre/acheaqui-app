import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { getNomeDoPlanoAtual, getRecursosDoPlano } from '../../src/services/PlanosServicesMock';
import AlertaPlanoLimitado from '../AlertaPlanoLimitado';

type Props = {
  logo: string | null;
  imagens: string[];
  onChangeLogo: (uri: string | null) => void;
  onChangeImagens: (uris: string[]) => void;
};

export default function UploadImagens({ logo, imagens, onChangeLogo, onChangeImagens }: Props) {
  const recursos = getRecursosDoPlano();
  const nomePlano = getNomeDoPlanoAtual();
  const maxImagens = recursos?.maxImagens ?? 0;
  const podeAdicionar = recursos?.podeAdicionarImagens;

  const imagensLimitadas = imagens.length >= maxImagens;

  const escolherImagem = async (callback: (uri: string) => void) => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permissão necessária', 'Permita o acesso à galeria para escolher imagens.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      callback(uri);
    }
  };

  const adicionarImagemAdicional = () => {
    if (!podeAdicionar) return;
    if (imagensLimitadas) {
      Alert.alert('Limite atingido', `Você pode adicionar no máximo ${maxImagens} imagens.`);
      return;
    }

    escolherImagem((uri) => {
      onChangeImagens([...imagens, uri]);
    });
  };

  const removerImagem = (uri: string) => {
    onChangeImagens(imagens.filter((img) => img !== uri));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Logotipo (opcional)</Text>
      {logo ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: logo }} style={styles.logoPreview} />
          <TouchableOpacity onPress={() => onChangeLogo(null)}>
            <Ionicons name="close-circle" size={24} color="#dc2626" />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.botao}
          onPress={() => escolherImagem((uri) => onChangeLogo(uri))}
        >
          <Text style={styles.botaoTexto}>Selecionar logotipo</Text>
        </TouchableOpacity>
      )}

      <Text style={[styles.label, { marginTop: 20 }]}>
        Imagens adicionais (até {maxImagens})
      </Text>

      {!podeAdicionar && (
        <AlertaPlanoLimitado
          tipo="recurso"
          mensagem="adicionar imagens do negócio"
          nomePlano={nomePlano}
        />
      )}

      {podeAdicionar && imagensLimitadas && (
        <AlertaPlanoLimitado
          tipo="limite"
          mensagem={`máximo de ${maxImagens} imagens adicionais`}
          nomePlano={nomePlano}
        />
      )}

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollArea}>
        {imagens.map((img, index) => (
          <View key={index} style={styles.imagemContainer}>
            <Image source={{ uri: img }} style={styles.imagemPreview} />
            <TouchableOpacity style={styles.removerIcone} onPress={() => removerImagem(img)}>
              <Ionicons name="close-circle" size={20} color="#dc2626" />
            </TouchableOpacity>
          </View>
        ))}
        {podeAdicionar && !imagensLimitadas && (
          <TouchableOpacity style={styles.adicionarImagem} onPress={adicionarImagemAdicional}>
            <Ionicons name="add" size={28} color="#4f46e5" />
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 8,
  },
  botao: {
    backgroundColor: '#4f46e5',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: '600',
  },
  previewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  logoPreview: {
    width: 64,
    height: 64,
    borderRadius: 10,
  },
  scrollArea: {
    marginTop: 8,
  },
  imagemContainer: {
    position: 'relative',
    marginRight: 12,
  },
  imagemPreview: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  removerIcone: {
    position: 'absolute',
    top: -6,
    right: -6,
    backgroundColor: '#fff',
    borderRadius: 10,
  },
  adicionarImagem: {
    width: 80,
    height: 80,
    backgroundColor: '#e0e7ff',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
