export interface DadosNegocioProps {
  nome: string;
  tipoNegocio: 'físico' | 'digital' | 'ambos';
  categoria: string;
  subcategoria: string; // ✅ Adicione esta linha
  descricao?: string;
  maiorDeIdade?: boolean;
}
