require('dotenv').config();

module.exports = {
  development: {
    username: "admin",
    password: "PM6fA7DjnpQc",
    database: "asistencias",
    host: "127.0.0.1",
    dialect: "postgres",
    port: "55432"
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql"
  },
  production: {
    use_env_variable: process.env.DATABASE_URL,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: "postgres",
    port: "5432",
    ssl: true,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
}