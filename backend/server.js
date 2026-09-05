const express = require('express');
const recipesRoutes = require('./routes/recipe')
const userRoutes = require('./routes/user')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const app = express();
app.use(express.static('public'));
const mongoose = require('mongoose')
// const mongoURL = 'mongodb+srv://heinzin121021_db_user:Io61STpbROwZRX6N@mern-cluster.39arczc.mongodb.net/?appName=MERN-Cluster'
const mongoURL = 'mongodb://127.0.0.1:27017/mern-project';
const cors = require('cors');
const AuthMiddleware = require('./middlewares/authMiddleware');

mongoose.connect(mongoURL).then(()=>{
    console.log('connected to db')
    app.listen(process.env.PORT,() => {
    console.log('app is running on localhost:4000')
})
}).catch((error)=>{
    console.log(error)
})
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}))



app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.json());
app.use('/api/recipes',AuthMiddleware,recipesRoutes);
app.use('/api/users',userRoutes);



