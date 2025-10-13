// cms/config/server.js
module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),

  app: {
    keys: env.array('APP_KEYS', ['yourKey1', 'yourKey2']),
  },

  url: env('PUBLIC_URL', 'http://localhost:1337'),

  webhooks: {
    populateRelations: env.bool('WEBHOOKS_POPULATE_RELATIONS', false),
  },

  settings: {
    cors: {
      origin: ['http://localhost:5173', 'https://lacglobal.up.railway.app'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      headers: ['Content-Type', 'Authorization', 'Origin', 'Accept'],
      keepHeaderOnError: true,
    },
  },
});
