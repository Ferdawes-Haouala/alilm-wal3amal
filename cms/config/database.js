<<<<<<< HEAD
const path = require('path');

module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'sqlite');

  const connections = {
    sqlite: {
      connection: {
        filename: path.join(
          __dirname,
          '..',
          env('DATABASE_FILENAME', '.tmp/data.db')
        ),
      },
      useNullAsDefault: true,
    },
    postgres: {
      connection: {
        connectionString: env('DATABASE_URL'),
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl: env.bool('DATABASE_SSL', false) && {
          rejectUnauthorized: env.bool('DATABASE_SSL_SELF', false),
        },
      },
      pool: {
        min: env.int('DATABASE_POOL_MIN', 2),
        max: env.int('DATABASE_POOL_MAX', 10),
      },
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
=======
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
>>>>>>> bb2372f8e9b0a0080564adb8b01b69c30e963469
  };
};