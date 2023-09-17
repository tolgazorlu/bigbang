require('dotenv').config();

module.exports = {
    app: {
        name: 'Bigbang',
    },
    port: process.env.PORT || 8080,
    database: {
        url: process.env.MONGO_URI
    }
};