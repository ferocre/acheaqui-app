import { Image, StyleSheet, Text, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import LogoCategoriaPadrao from '../LogoCategoriaPadrao';

type PlanoType = 'Básico' | 'Essencial' | 'Premium';

type Estabelecimento = {
  id: string;
  nome: string;
  categoria: string;
  nota?: number; // Tornando opcional
  bairro?: string; // Tornando opcional
  tags?: string[]; // Tornando opcional
  plano?: PlanoType; // Tornando opcional
  logoUrl?: string;
};

type Props = {
  item?: Estabelecimento; // Tornando item opcional
  index?: number;
};

export default function CardEstabelecimento({ item, index }: Props) {
  // Se item for undefined, retorna null ou um placeholder
  if (!item) {
    return null;
    // Ou retorne um placeholder:
    // return <View style={[styles.card, { height: 120 }]} />;
  }

  return (
    <Animatable.View
      animation="fadeInUp"
      delay={index * 100}
      duration={400}
      useNativeDriver
      style={styles.card}
    >
      <View style={styles.headerCard}>
        <View style={styles.logoArea}>
          {item.logoUrl ? (
            <Image 
              source={{ uri: item.logoUrl }} 
              style={styles.logo} 
              resizeMode="cover"
            />
          ) : (
            <LogoCategoriaPadrao categoria={item.categoria} size={48} />
          )}
        </View>

        <View style={{ flex: 1 }}>
          <View style={styles.topoInfo}>
            <Text style={styles.nome} numberOfLines={1}>
              {item.nome}
            </Text>
            {item.plano && item.plano !== 'Básico' && (
              <Text
                style={[
                  styles.seloPlano, 
                  item.plano === 'Premium' ? styles.seloPremium : styles.seloEssencial
                ]}
              >
                {item.plano}
              </Text>
            )}
          </View>

          <Text style={styles.categoria} numberOfLines={1}>
            {item.categoria} • {item.nota?.toFixed(1) ?? 'N/A'} ⭐
          </Text>
          
          {item.bairro && (
            <Text style={styles.bairro} numberOfLines={1}>
              {item.bairro}
            </Text>
          )}

          {item.tags && item.tags.length > 0 && (
            <View style={styles.tags}>
              {item.tags.map((tag, i) => (
                <Text key={`${tag}-${i}`} style={styles.tag} numberOfLines={1}>
                  {tag}
                </Text>
              ))}
            </View>
          )}
        </View>
      </View>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 20,
    marginBottom: 18,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 4,
  },
  headerCard: {
    flexDirection: 'row',
    gap: 12,
  },
  logoArea: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    overflow: 'hidden',
  },
  logo: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },
  topoInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  nome: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1c1c1e',
    flex: 1,
  },
  seloPlano: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    fontSize: 11,
    fontWeight: '600',
    overflow: 'hidden',
    textTransform: 'uppercase',
  },
  seloPremium: {
    backgroundColor: '#ff453a',
    color: '#fff',
  },
  seloEssencial: {
    backgroundColor: '#ffd60a',
    color: '#1c1c1e',
  },
  categoria: {
    fontSize: 14,
    color: '#6e6e73',
    marginBottom: 2,
  },
  bairro: {
    fontSize: 13,
    color: '#8e8e93',
    marginBottom: 8,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: '#e0e0e0',
    color: '#1c1c1e',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 16,
    fontSize: 12,
    maxWidth: '100%',
  },
}); 