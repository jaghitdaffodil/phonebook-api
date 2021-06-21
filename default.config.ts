export const databaseOptions = {
    "type": "postgres",
    "host": "localhost",
    "port": 5442,
    "username": "postgres",
    "password": "aidock",
    "database": "aidock",
    "entities": ["dist/**/*.entity{.ts,.js}"],
    "synchronize": true,
    "logging": false,
};
