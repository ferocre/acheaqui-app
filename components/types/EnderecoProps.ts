export interface EnderecoProps {
  estado: string;              // Obrigatório, tipo correto
  cidade: string;              // Obrigatório, tipo correto
  bairro?: string;             // Opcional, comum em integrações
  endereco?: string;           // Opcional, poderia renomear para 'rua' se for mais claro
  cep?: string;                // Opcional, mas normalmente obrigatório — depende da regra do seu app
  zona?: string;               // Opcional — útil em apps urbanos
  latitude?: number;           // Ótimo para geolocalização
  longitude?: number;          // Idem
  comercioDigital?: boolean;   // Excelente para lógica condicional
  linkLoja?: string;           // Muito bom para apps com loja virtual
}
