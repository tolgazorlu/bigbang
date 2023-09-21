//IMPORTS
require('dotenv').config();
import express, { Express, Request, Response } from 'express';
import chalk from 'chalk';
import path from 'path'
const cors = require('cors')
const cookieParser = require('cookie-parser')
//ROUTE IMPORTS
const productRoute = require('./routes/productRoute')
const authRoute = require('./routes/authRoute')
const orderRoute = require('./routes/orderRoute')

//APP
const app: Express = express();

//CONFIG KEYS
const keys = require('./config/keys');
const { port } = keys;

//DB SETUP
const setupDB = require('./utils/db')
setupDB();

//MIDDLEWARES
app.use(
  cors({
    origin: '*',
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
)
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//ROUTES
app.use('/product', productRoute);
app.use('/user', authRoute)
app.use('/order', orderRoute)

app.use(express.static(path.join(__dirname, '../../client/dist')))
app.get('*', (req: Request, res: Response) =>
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'))
)

//LISTEN

app.listen(port, () => {
  console.log(`Port is running on ${chalk.blue(port)}`);
})
