const mongoose = require('mongoose');
const db_cred = require('./dbconfig.json');

//Database config values

const db_user = db_cred.db_user;
const db_password = db_cred.db_password;
const db_host = db_cred.db_host;
const db_port = db_cred.db_port;
const db_name = db_cred.db_name;

const db_conn = `mongodb://${db_user}:${db_password}@${db_host}:${db_port}/${db_name}`;

// Database connection
const connectDB = async () => {
    try {
        await mongoose.connect(db_conn);
        console.log('MongoDB connected');
    } catch (error) {
        console.error('Error connecting to MongoDB', error);
        process.exit(1);
    }
};

module.exports = connectDB;
