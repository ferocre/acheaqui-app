// src/utils/destaquesEspeciais.ts

import React from 'react';

export interface DestaqueEspecial {
  id: string;
  nome: string;
  descricao: string;
  icone: string;
  categoriasPermitidas?: string[];
}

export const destaquesEspeciais: DestaqueEspecial[] = [
  {
    id: 'pet',
    nome: 'Pet Friendly',
    descricao: 'Aceita animais de estimação',
    icone: 'paw',
    categoriasPermitidas: ['Alimentação', 'Serviços', 'Beleza', 'Fitness'],
  },
  {
    id: 'wifi',
    nome: 'Wi-Fi grátis',
    descricao: 'Disponibiliza internet gratuita',
    icone: 'wifi',
    categoriasPermitidas: ['Coworking', 'Alimentação', 'Tecnologia', 'Serviços'],
  },
  {
    id: 'acessibilidade',
    nome: 'Acessibilidade',
    descricao: 'Ambiente acessível para todos',
    icone: 'wheelchair',
    categoriasPermitidas: [
      'Alimentação', 'Beleza', 'Fitness', 'Moda', 'Serviços', 'Saúde',
      'Tecnologia', 'Pets', 'Gospel',
    ],
  },
  {
    id: 'instagramavel',
    nome: 'Instagramável',
    descricao: 'Ambiente ideal para fotos',
    icone: 'camera',
    categoriasPermitidas: ['Beleza', 'Moda', 'Alimentação', 'Eventos', 'Fitness'],
  },
  {
    id: 'kids',
    nome: 'Espaço Kids',
    descricao: 'Espaço para crianças',
    icone: 'baby',
    categoriasPermitidas: ['Alimentação', 'Beleza', 'Fitness', 'Serviços'],
  },
  {
    id: 'coworking',
    nome: 'Coworking',
    descricao: 'Espaço para trabalhar remotamente',
    icone: 'laptop',
    categoriasPermitidas: ['Serviços', 'Tecnologia'],
  },
  {
    id: 'reserva',
    nome: 'Aceita reservas online',
    descricao: 'Agendamento pela internet',
    icone: 'calendar',
    categoriasPermitidas: ['Beleza', 'Fitness', 'Moda', 'Serviços', 'Saúde'],
  },
  {
    id: 'delivery',
    nome: 'Entrega própria',
    descricao: 'Realiza entregas diretamente',
    icone: 'truck',
    categoriasPermitidas: ['Alimentação', 'Serviços'],
  },
  {
    id: 'vegano',
    nome: 'Opção Vegana',
    descricao: 'Alimentos ou serviços veganos',
    icone: 'leaf',
    categoriasPermitidas: ['Alimentação'],
  },
  {
    id: 'semGluten',
    nome: 'Sem Glúten',
    descricao: 'Opções livres de glúten',
    icone: 'bread-slice',
    categoriasPermitidas: ['Alimentação'],
  },
  {
    id: 'semLactose',
    nome: 'Sem Lactose',
    descricao: 'Opções sem lactose',
    icone: 'cheese',
    categoriasPermitidas: ['Alimentação'],
  },
  {
    id: 'plus',
    nome: 'Plus Size',
    descricao: 'Produtos ou serviços para todos os corpos',
    icone: 'user-plus',
    categoriasPermitidas: ['Moda', 'Beleza'],
  },
  {
    id: 'familiar',
    nome: 'Ambiente Familiar',
    descricao: 'Ideal para famílias e crianças',
    icone: 'users',
    categoriasPermitidas: ['Alimentação', 'Beleza', 'Eventos', 'Fitness'],
  },
  {
    id: 'gospel',
    nome: 'Ambiente Gospel',
    descricao: 'Ambiente com música ou valores cristãos',
    icone: 'cross',
    categoriasPermitidas: ['Alimentação', 'Serviços', 'Eventos', 'Gospel'],
  },
  {
    id: 'aoArLivre',
    nome: 'Espaço ao ar livre',
    descricao: 'Ambiente externo ou ventilado',
    icone: 'sun',
    categoriasPermitidas: ['Alimentação', 'Fitness', 'Eventos'],
  },
];

// Normalização robusta de categoria
function normalizarCategoria(str: string): string {
  return str
    .toLowerCase()
    .normalize('NFD') // remove acentos
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/\s+/g, '') // remove espaços
    .trim();
}

const destaquesPorCategoria: Record<string, DestaqueEspecial[]> = {};
destaquesEspeciais.forEach((destaque) => {
  destaque.categoriasPermitidas?.forEach((categoria) => {
    const chave = normalizarCategoria(categoria);
    if (!destaquesPorCategoria[chave]) {
      destaquesPorCategoria[chave] = [];
    }
    destaquesPorCategoria[chave].push(destaque);
  });
});

export function getDestaquesPorCategoriaOtimizado(categoria: string): DestaqueEspecial[] {
  const chave = normalizarCategoria(categoria);
  return destaquesPorCategoria[chave] || [];
}

const DestaquesEspeciaisComponent: React.FC = () => null;
export default DestaquesEspeciaisComponent;
