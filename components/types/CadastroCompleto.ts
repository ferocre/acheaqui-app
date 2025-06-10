import { DadosNegocioProps } from './DadosNegocioProps';
import { EnderecoProps } from './EnderecoProps';
import { HorariosCompletosProps } from './HorarioProps';
import { ImagemUpload } from './ImagemUpload';
import { RedeSocial } from './RedeSocial';

export interface CadastroCompleto {
  dadosNegocio: DadosNegocioProps;
  imagens: ImagemUpload[];
  redesSociais: RedeSocial[];
  modalidades: string[];
  faixaPreco: string;
  formasPagamento: string[];
  destaques: string[];
  horarios: HorariosCompletosProps;
  endereco: EnderecoProps;
  plano: string;
}
