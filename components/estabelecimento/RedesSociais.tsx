import { Picker } from '@react-native-picker/picker';
import { useMemo, useRef, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

import {
  getNomeDoPlanoAtual,
  getRecursosDoPlano,
  setPlanoAtual,
  TipoPlano
} from '../../src/services/PlanosServicesMock';
import AlertaPlanoLimitado from '../AlertaPlanoLimitado';
import type { RedeSocial } from '../types/RedeSocial';

// Adicione este tipo para as props do AlertaPlanoLimitado
type AlertaPlanoLimitadoProps = {
  tipo: 'recurso' | 'limite';
  mensagem: string;
  nomePlano: string;
  onUpgrade?: () => void;
};

type Props = {
  redes: (RedeSocial & { id: number })[];
  onChange: (redes: (RedeSocial & { id: number })[]) => void;
  onPlanChange?: (novoPlano: TipoPlano) => void;
};

const REDES_DISPONIVEIS = [
  { nome: 'Instagram', prefixo: 'https://instagram.com/' },
  { nome: 'LinkedIn', prefixo: 'https://linkedin.com/in/' },
  { nome: 'Facebook', prefixo: 'https://facebook.com/' },
  { nome: 'TikTok', prefixo: 'https://tiktok.com/@' },
  { nome: 'YouTube', prefixo: 'https://youtube.com/' },
  { nome: 'OnlyFans', prefixo: 'https://onlyfans.com/' },
  { nome: 'X (Twitter)', prefixo: 'https://x.com/' },
  { nome: 'Privacy', prefixo: 'https://privacy.com/' },
  { nome: 'CloseFriends', prefixo: 'https://closefriends.com/' },
];

export default function RedesSociais({ redes = [], onChange, onPlanChange }: Props) {
  const recursos = getRecursosDoPlano();
  const nomePlano = getNomeDoPlanoAtual();
  const contadorId = useRef(1);

  const [novaRede, setNovaRede] = useState<Omit<RedeSocial, 'id'> & { id?: number }>({
    plataforma: 'Instagram',
    identificador: '',
  });

  const maxRedesPermitidas = recursos.maxRedesSociais;
  const maxAtingido = redes.length >= maxRedesPermitidas;
  const podeAdicionar = recursos.podeAdicionarRedesSociais;

  const prefixoAtual = useMemo(() => {
    return REDES_DISPONIVEIS.find(r => r.nome === novaRede.plataforma)?.prefixo || '';
  }, [novaRede.plataforma]);

  const adicionarRede = () => {
    if (!novaRede.identificador.trim() || !podeAdicionar || maxAtingido) return;

    const novaRedeComId = {
      ...novaRede,
      identificador: novaRede.identificador.trim(),
      id: contadorId.current++,
    };

    onChange([...redes, novaRedeComId]);
    setNovaRede({ plataforma: 'Instagram', identificador: '' });
  };

  const removerRede = (id: number) => {
    onChange(redes.filter(r => r.id !== id));
  };

  const handleUpgradePlan = () => {
    const currentPlan = getNomeDoPlanoAtual().toLowerCase();
    let novoPlano: TipoPlano = 'premium';
    
    if (currentPlan === 'básico') {
      novoPlano = 'essencial';
    }
    
    setPlanoAtual(novoPlano);
    onPlanChange?.(novoPlano);
  };

  const renderRede = ({ item }: { item: RedeSocial & { id: number } }) => {
    const prefixo = REDES_DISPONIVEIS.find(r => r.nome === item.plataforma)?.prefixo || '';
    return (
      <View style={styles.item}>
        <Text style={styles.itemTexto}>
          {item.plataforma}: {prefixo}{item.identificador}
        </Text>
        <TouchableOpacity onPress={() => removerRede(item.id)}>
          <Text style={styles.remover}>Remover</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Redes sociais profissionais</Text>

      {!podeAdicionar ? (
        <AlertaPlanoLimitado
          tipo="recurso"
          mensagem="adicionar redes sociais"
          nomePlano={nomePlano}
          onUpgrade={onPlanChange ? handleUpgradePlan : undefined}
        />
      ) : maxAtingido ? (
        <AlertaPlanoLimitado
          tipo="limite"
          mensagem={`máximo de ${maxRedesPermitidas} redes sociais`}
          nomePlano={nomePlano}
          onUpgrade={onPlanChange ? handleUpgradePlan : undefined}
        />
      ) : null}

      <View style={!podeAdicionar || maxAtingido ? styles.disabledContainer : null}>
        <Picker
          selectedValue={novaRede.plataforma}
          onValueChange={(itemValue) =>
            setNovaRede(prev => ({ ...prev, plataforma: itemValue }))
          }
          enabled={podeAdicionar && !maxAtingido}
          style={styles.picker}
        >
          {REDES_DISPONIVEIS.map((rede) => (
            <Picker.Item key={rede.nome} label={rede.nome} value={rede.nome} />
          ))}
        </Picker>

        <TextInput
          placeholder={`Identificador (${prefixoAtual})`}
          style={styles.input}
          value={novaRede.identificador}
          onChangeText={(text) =>
            setNovaRede(prev => ({ ...prev, identificador: text }))
          }
          editable={podeAdicionar && !maxAtingido}
        />

        <TouchableOpacity
          style={[
            styles.botao, 
            (!podeAdicionar || maxAtingido) && styles.botaoDesativado
          ]}
          onPress={adicionarRede}
          disabled={!podeAdicionar || maxAtingido}
        >
          <Text style={styles.botaoTexto}>
            {podeAdicionar ? 'Adicionar rede' : 'Atualize seu plano'}
          </Text>
        </TouchableOpacity>
      </View>

      {redes.length > 0 && (
        <FlatList
          data={redes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderRede}
          style={styles.lista}
        />
      )}
    </View>
  );
}

// Mantenha os estilos como estão
const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  disabledContainer: {
    opacity: 0.6,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 8,
  },
  picker: {
    backgroundColor: '#f2f2f2',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
  },
  botao: {
    backgroundColor: '#4f46e5',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 12,
  },
  botaoDesativado: {
    backgroundColor: '#ccc',
  },
  botaoTexto: {
    color: '#fff',
    fontWeight: '600',
  },
  lista: {
    marginTop: 8,
  },
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#eef2ff',
    padding: 10,
    borderRadius: 6,
    marginBottom: 6,
  },
  itemTexto: {
    flex: 1,
    fontSize: 14,
  },
  remover: {
    color: '#dc2626',
    marginLeft: 12,
  },
});