const express = require('express'); 
const mongoose = require('mongoose')
const duckRoutes = require('./routes/duckRoutes.js')
const cors = require('cors')

const dotenv = require('dotenv')
dotenv.config()

const PORT = process.env.PORT; 
const MONGODB_URL = process.env.MONGODB_URL

const app = express();
app.use(express.json())

app.get('/', (req, res) => {
    res.send("Hello worlds"); // This will echo back the parsed body
});

app.use(cors())

app.use('/ducks', duckRoutes)

mongoose.connect(MONGODB_URL)
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('connected to mongoose'))

app.listen(PORT, (error) =>{ 
	if(!error) 
		console.log("Server is Successfully Running, and App is listening on port "+ PORT) 
	else
		console.log("Error occurred, server can't start", error); 
	} 
); 
