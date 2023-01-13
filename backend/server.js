const express = require('express')
const path = require('path')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 8000
const colors = require('colors')
const errorHandler = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')

const app = express()

app.use(express.json()) // to get the data from the body of the req
app.use(express.urlencoded({extended: false})) // to get the data from the body of the req



//Routes
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))

// serve Frontend
if(process.env.NODE_ENV === 'productin') {
    //Set build folder as static
    app.use(express.static(path.join(__dirname, '../frontend/build')))

    app.get('*', (req, res) => res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html'))
} else {
    app.get('/', (req, res) => {
        //res.send("Hello")
        res.status(201).json({message: 'Welcome to the support desk api'})
    })
}


app.use(errorHandler)

//connect to database
connectDB()

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))