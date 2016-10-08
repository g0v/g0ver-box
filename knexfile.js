module.exports = {
  client: 'pg',
  connection: process.env.DATABASE_URL || {
    host: 'localhost',
    port: 54320,
    user: 'postgres',
    password: '',
    database: 'g0vhub',
  },
  debug: true,
};
