const mongoose = require('mongoose')
const username = process.env.mongo_username
const password = process.env.mongo_password
const cluster = process.env.mongo_cluster
const database = process.env.mongo_database

const uri = `mongodb+srv://${username}:${password}@${cluster}/${database}?retryWrites=true&w=majority&appName=Arete`

mongoose.connect(uri)

const conn = mongoose.connection;

conn.on('error', () => console.error.bind(console, 'connection error'));

conn.once('open', () => console.info('Connected to MongoDB Atlas'));

module.exports = conn;