// src/types/RedeSocialProps.ts

export interface RedeSocial {
  plataforma: string; // Ex: 'Instagram', 'LinkedIn'
  identificador: string; // Ex: 'meunegocio'
}

export interface RedeSocialProps {
  redesSociais: RedeSocial[];
  setRedesSociais: (redes: RedeSocial[]) => void;
  maxRedesSociais?: number; // Limite de redes sociais permitidas
  plataformasPermitidas?: string[];
}
