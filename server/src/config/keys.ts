module.exports = {
    app: {
        name: 'Matter Store',
    },
    port: process.env.PORT || 8080,
    database: {
        url: process.env.MONGO_URI
    }
};