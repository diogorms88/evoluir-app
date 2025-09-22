-- Configuração do Storage Bucket para imagens dos depoimentos
-- Execute estes comandos no painel do Supabase (SQL Editor)
-- IMPORTANTE: Execute como usuário com privilégios de administrador

-- 1. Criar o bucket 'evoluir' se não existir
INSERT INTO storage.buckets (id, name, public) 
VALUES ('evoluir', 'evoluir', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Políticas para o bucket 'evoluir' (execute uma por vez)
-- Política para permitir uploads públicos
CREATE POLICY "Allow public uploads to evoluir bucket" ON storage.objects
    FOR INSERT WITH CHECK (bucket_id = 'evoluir');

-- Política para permitir leitura pública
CREATE POLICY "Allow public access to evoluir bucket" ON storage.objects
    FOR SELECT USING (bucket_id = 'evoluir');

-- ALTERNATIVA: Se as políticas acima não funcionarem, use o painel do Supabase:
-- 1. Vá para Storage > Settings
-- 2. Crie um novo bucket chamado 'evoluir' 
-- 3. Marque como 'Public bucket'
-- 4. Em Policies, adicione políticas para INSERT e SELECT com bucket_id = 'evoluir'

-- Verificar se o bucket foi criado corretamente
SELECT * FROM storage.buckets WHERE id = 'evoluir';

-- Verificar as políticas criadas
SELECT * FROM pg_policies WHERE tablename = 'objects' AND schemaname = 'storage';