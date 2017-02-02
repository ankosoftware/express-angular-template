const properties = {
    HOST: process.env.HOST || 'localhost',
    PORT: process.env.PORT || '3001',

    SMTP_HOST: process.env.SMTP_HOST || 'smtp.gmail.com',
    SMTP_SSL: process.env.SMTP_SSL || true,
    SMTP_PORT: process.env.SMTP_PORT || 465,
    SMTP_USER: process.env.SMTP_USER || '********',
    SMTP_PASSWORD: process.env.SMTP_PASSWORD || '********',

    MONGO_HOST: process.env.MONGO_HOST || 'localhost',
    MONGO_PORT: process.env.MONGO_PORT || '27018',
    MONGO_DB_NAME: process.env.MONGO_DB_NAME || 'db0-name'
};

properties.MONGO_URL = `mongodb://${properties.MONGO_HOST}:${properties.MONGO_PORT}/${properties.MONGO_DB_NAME}`;

export default properties;