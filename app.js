const express = require('express')
const config = require('config')
const mongoose = require('mongoose')

const app = express()

app.use(express.json({extended:true}))

app.use('/api/auth', require('./routes/auth.routes'))

const PORT = config.get('port') || 3000

async function start() {
    try{
    await mongoose.connect(config.get('mongoURI'), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
        app.listen(PORT,() => console.log('start on port - ${PORT}'))
    } catch (e) {
        console.log('Server Error', e.message)
        process.exit(1)
    }
}
start()

