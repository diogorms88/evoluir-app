-- Script para aprovar depoimentos no Supabase
-- Execute este comando no SQL Editor do painel do Supabase

-- 1. Ver todos os depoimentos pendentes de aprovação
SELECT 
    id,
    name,
    position,
    department,
    content,
    created_at,
    is_approved
FROM testimonials 
WHERE is_approved = false
ORDER BY created_at DESC;

-- 2. Aprovar um depoimento específico (substitua 'ID_DO_DEPOIMENTO' pelo ID real)
-- UPDATE testimonials 
-- SET is_approved = true 
-- WHERE id = 'ID_DO_DEPOIMENTO';

-- 3. Aprovar todos os depoimentos pendentes (use com cuidado!)
-- UPDATE testimonials 
-- SET is_approved = true 
-- WHERE is_approved = false;

-- 4. Aprovar e destacar um depoimento (featured)
-- UPDATE testimonials 
-- SET is_approved = true, is_featured = true 
-- WHERE id = 'ID_DO_DEPOIMENTO';

-- 5. Ver todos os depoimentos aprovados
SELECT 
    id,
    name,
    position,
    department,
    content,
    created_at,
    is_approved,
    is_featured
FROM testimonials 
WHERE is_approved = true
ORDER BY created_at DESC;