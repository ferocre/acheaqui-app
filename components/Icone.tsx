// src/components/Icone.tsx

import { Feather, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';

type TiposIcones = 'Feather' | 'FontAwesome5' | 'MaterialCommunityIcons';

type Props = {
  tipo: TiposIcones;
  nome: string;
  size?: number;
  color?: string;
  style?: any;
};

export default function Icone({
  tipo,
  nome,
  size = 16,
  color = '#333',
  style,
}: Props) {
  const props = { name: nameAsConst(nome), size, color, style };

  switch (tipo) {
    case 'Feather':
      return <Feather {...props} />;
    case 'FontAwesome5':
      return <FontAwesome5 {...props} />;
    case 'MaterialCommunityIcons':
      return <MaterialCommunityIcons {...props} />;
    default:
      return <Feather name="alert-triangle" size={size} color="red" />;
  }
}

// Helper para forçar tipagem literal (evita warning de deprecated)
function nameAsConst(nome: string): any {
  return nome as any;
}
