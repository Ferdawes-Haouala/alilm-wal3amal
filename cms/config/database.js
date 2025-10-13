
module.exports = ({ env }) => {
  // Détection automatique de l'environnement
  const isDevelopment = env('NODE_ENV', 'development') === 'development';
  const hasPostgresUrl = !!env('DATABASE_URL');

  // Si DATABASE_URL existe → PostgreSQL (Railway)
  // Sinon → SQLite (développement local)
  if (hasPostgresUrl) {
    return {
      connection: {
        client: 'postgres',
        connection: {
          connectionString: env('DATABASE_URL'),
          ssl: env.bool('DATABASE_SSL', false) ? {
            rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false)
          } : false,
        },
        debug: false,
      },
    };
  }

  // Configuration SQLite par défaut (développement local)
  return {
    connection: {
      client: 'sqlite',
      connection: {
        filename: env('DATABASE_FILENAME', '.tmp/data.db'),
      },
      useNullAsDefault: true,
      debug: false,
    },
  };
};