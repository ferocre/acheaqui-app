export interface ImagemUpload {
  uri: string;
  nome: string;
  tipo: string;
}
export interface ImagemUploadProps {
  imagens: ImagemUpload[];
  setImagens: (imagens: ImagemUpload[]) => void;
  limite?: number;
  tamanhoMaximo?: number; // em bytes
  tamanhoMinimo?: number; // em bytes
  extensoesPermitidas?: string[];
}