const redis = require('redis')
const HOST = '192.168.100.35'
const PORT = 6379

const client = redis.createClient({
    host: HOST,
    port: PORT
    // url: 'redis://redis-service.default.svc.cluster.local:6379',
    // password: 'aretepassword'
})

client.connect()

client.on('connect', () => {
    console.log(`Client connecting to Redis ...`)
})

client.on('error', (err) => {
    console.log(`Error in client : `, err.message)
})

client.on('ready', () => {
    console.log(`Client connected to Redis and ready to use ...`)
})

client.on('end', () => {
    console.log(`Client disconnected from Redis `)
})

process.on('SIGINT', () => {
    client.quit()
})

module.exports = client