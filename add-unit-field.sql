-- Script para adicionar o campo 'unit' à tabela testimonials
-- Execute este comando no SQL Editor do painel do Supabase

-- Adicionar coluna 'unit' à tabela testimonials
ALTER TABLE testimonials 
ADD COLUMN IF NOT EXISTS unit VARCHAR(255) NOT NULL DEFAULT 'Unidade não informada';

-- Criar índice para melhor performance na busca por unidade
CREATE INDEX IF NOT EXISTS idx_testimonials_unit ON testimonials(unit);

-- Verificar a estrutura atualizada da tabela
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'testimonials' 
ORDER BY ordinal_position;

-- Exemplo de como atualizar registros existentes (opcional)
-- UPDATE testimonials SET unit = 'Unidade Caçapava' WHERE id = 'ID_DO_REGISTRO';
-- UPDATE testimonials SET unit = 'Unidade Jundiaí' WHERE id = 'ID_DO_REGISTRO';
-- UPDATE testimonials SET unit = 'Unidade Betim' WHERE id = 'ID_DO_REGISTRO';
-- UPDATE testimonials SET unit = 'Unidade Varginha' WHERE id = 'ID_DO_REGISTRO';