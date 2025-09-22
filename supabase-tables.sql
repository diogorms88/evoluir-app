-- Tabela para armazenar os depoimentos dos usuários
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  department VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_approved BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_testimonials_created_at ON testimonials(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_testimonials_approved ON testimonials(is_approved);
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(is_featured);

-- Trigger para atualizar o campo updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_testimonials_updated_at
    BEFORE UPDATE ON testimonials
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Política de segurança RLS (Row Level Security)
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Política para permitir leitura de depoimentos aprovados por qualquer usuário
CREATE POLICY "Allow public read access to approved testimonials" ON testimonials
    FOR SELECT USING (is_approved = true);

-- Política para permitir inserção de novos depoimentos (todos podem enviar)
CREATE POLICY "Allow public insert access" ON testimonials
    FOR INSERT WITH CHECK (true);

-- Configuração do Storage Bucket para imagens
-- Execute este comando no painel do Supabase ou via SQL:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('evoluir', 'evoluir', true);

-- Política para o bucket de storage (permitir upload público)
-- CREATE POLICY "Allow public uploads" ON storage.objects
--     FOR INSERT WITH CHECK (bucket_id = 'evoluir');

-- CREATE POLICY "Allow public access" ON storage.objects
--     FOR SELECT USING (bucket_id = 'evoluir');

-- Inserir alguns dados de exemplo (opcional)
INSERT INTO testimonials (name, position, department, content, is_approved, is_featured) VALUES
('Ana Carolina Silva', 'Analista de Qualidade', 'Qualidade', 'O Programa Evoluir transformou minha visão sobre o setor automotivo. As aulas práticas com nossos especialistas internos me deram uma compreensão muito mais profunda dos processos e desafios da Plascar. Sinto-me mais preparada para contribuir efetivamente com os projetos da empresa.', true, true),
('Ricardo Santos', 'Supervisor de Produção', 'Operações', 'Participar do Programa Evoluir foi uma experiência incrível! A combinação de teoria e prática, ministrada por profissionais que realmente conhecem a realidade da empresa, fez toda a diferença. Consegui aplicar imediatamente os conhecimentos no meu dia a dia.', true, true),
('Mariana Costa', 'Engenheira de Processos', 'Engenharia', 'O programa proporcionou uma imersão completa no universo Plascar. Além do conhecimento técnico, pude expandir minha rede de contatos internos e trocar experiências valiosas com colegas de diferentes áreas. Recomendo a todos os colaboradores!', true, true);