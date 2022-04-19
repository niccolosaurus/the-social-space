const { connect, connection } = require('mongoose');

const connectionString = 
    process.env.MONGODB_URI || 'mongodb://localhost:27017/socialspaceDB'

    connect(connectionString, {
        useNewURLParser: true,
        useUnifiedTopology: true,
    });

module.exports = connection;