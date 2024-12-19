require("dotenv").config();
import pg from "pg";

module.exports = {
    development: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: pg,
        port: process.env.DB_PORT || 5432,
    },
    test: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: pg,
        port: process.env.DB_PORT || 5432,
    },
    production: {
        use_env_variable: "DB_URI",
        dialect: pg,
        logging: false, 
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },
        },
    },
};
