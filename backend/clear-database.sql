-- Script para limpar completamente a base de dados
-- ⚠️ ATENÇÃO: Este script irá apagar TODOS os dados!

-- Desabilitar verificações de chave estrangeira temporariamente
SET session_replication_role = replica;

-- Apagar todas as tabelas relacionadas
DROP TABLE IF EXISTS "score" CASCADE;
DROP TABLE IF EXISTS "match_users_user" CASCADE;
DROP TABLE IF EXISTS "match" CASCADE;
DROP TABLE IF EXISTS "user" CASCADE;

-- Reabilitar verificações de chave estrangeira
SET session_replication_role = DEFAULT;

-- Verificar se as tabelas foram removidas
SELECT table_name 
FROM information_schema.tables 
WHERE table_schema = 'public' 
AND table_name IN ('user', 'match', 'match_users_user', 'score');

-- Mensagem de confirmação
SELECT 'Base de dados limpa com sucesso!' as status; 