const { DataSource } = require("typeorm");
require("dotenv").config();

async function clearDatabase() {
  const dataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "postgres",
    database: process.env.DB_NAME || "truco_manager",
    synchronize: false,
    logging: true,
  });

  try {
    console.log("🔄 Conectando ao banco de dados...");
    await dataSource.initialize();
    
    console.log("🗑️ Limpando base de dados...");
    
    // Desabilitar verificações de chave estrangeira
    await dataSource.query("SET session_replication_role = replica;");
    
    // Apagar todas as tabelas
    await dataSource.query('DROP TABLE IF EXISTS "score" CASCADE;');
    await dataSource.query('DROP TABLE IF EXISTS "match_users_user" CASCADE;');
    await dataSource.query('DROP TABLE IF EXISTS "match" CASCADE;');
    await dataSource.query('DROP TABLE IF EXISTS "user" CASCADE;');
    
    // Reabilitar verificações
    await dataSource.query("SET session_replication_role = DEFAULT;");
    
    console.log("✅ Base de dados limpa com sucesso!");
    
    // Verificar se as tabelas foram removidas
    const tables = await dataSource.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('user', 'match', 'match_users_user', 'score')
    `);
    
    if (tables.length === 0) {
      console.log("✅ Todas as tabelas foram removidas!");
    } else {
      console.log("⚠️ Algumas tabelas ainda existem:", tables);
    }
    
  } catch (error) {
    console.error("❌ Erro ao limpar base de dados:", error);
  } finally {
    await dataSource.destroy();
    console.log("🔌 Conexão fechada.");
  }
}

clearDatabase(); 