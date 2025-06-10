// src/utils/filtrosPorCategoria.ts

import React from 'react';

export interface Estabelecimento {
  id: string;
  nome: string;
  categoria: string;
  bairro: string;
  nota: number;
  aberto: boolean;
  destaques: string[];
  preco?: number;
  formasPagamento?: string[];
  modalidadeAtendimento?: string[];
  diasFuncionamento?: string[];
  imagens?: string[];
  logo?: string;
}

export interface FiltrosDeBusca {
  categoria: string;
  avaliacaoMin?: number;
  bairro?: string;
  abertoAgora?: boolean;
  destaquesSelecionados?: string[];
  precoMin?: number;
  precoMax?: number;
  formasPagamentoSelecionadas?: string[];
  modalidadesSelecionadas?: string[];
  diasSelecionados?: string[];
  apenasComImagens?: boolean;
}

export function filtrarEstabelecimentos(
  estabelecimentos: Estabelecimento[],
  filtros: FiltrosDeBusca
): Estabelecimento[] {
  return estabelecimentos.filter((item) => {
    if (item.categoria !== filtros.categoria) return false;

    if (filtros.avaliacaoMin && item.nota < filtros.avaliacaoMin) return false;

    if (
      filtros.bairro &&
      !item.bairro.toLowerCase().includes(filtros.bairro.toLowerCase())
    ) return false;

    if (filtros.abertoAgora && !item.aberto) return false;

    if (
      filtros.destaquesSelecionados &&
      !filtros.destaquesSelecionados.every((id) =>
        item.destaques?.includes(id)
      )
    ) return false;

    if (
      filtros.precoMin !== undefined &&
      (item.preco ?? 0) < filtros.precoMin
    ) return false;

    if (
      filtros.precoMax !== undefined &&
      (item.preco ?? Infinity) > filtros.precoMax
    ) return false;

    if (
      filtros.formasPagamentoSelecionadas &&
      !filtros.formasPagamentoSelecionadas.every((f) =>
        item.formasPagamento?.includes(f)
      )
    ) return false;

    if (
      filtros.modalidadesSelecionadas &&
      !filtros.modalidadesSelecionadas.some((mod) =>
        item.modalidadeAtendimento?.includes(mod)
      )
    ) return false;

    if (
      filtros.diasSelecionados &&
      !filtros.diasSelecionados.every((dia) =>
        item.diasFuncionamento?.includes(dia)
      )
    ) return false;

    if (
      filtros.apenasComImagens &&
      !(item.logo || (item.imagens && item.imagens.length > 0))
    ) return false;

    return true;
  });
}

// Exportação padrão para evitar erro de rota no Expo Router
const FiltrosPorCategoriaComponent: React.FC = () => null;
export default FiltrosPorCategoriaComponent;
