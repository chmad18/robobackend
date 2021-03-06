const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const knex = require('knex');
const bcrypt = require('bcrypt');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const imageSubmitter = require('./controllers/imageSubmitter');

const db = knex({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'test',
        database: 'smartbrain'
    }
});

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.status(200).json('Server is up and running');
})

app.post("/signin",  signin.handleSignin(db, bcrypt));

app.post("/register", (req, res) => {register.handleRegister(req, res, db, bcrypt)});

app.get("/profile/:id", profile.handleGet(db));

app.put('/image', (req, res) => {imageSubmitter.handleSubmit(req, res, db)});
app.post('/imageurl', (req, res) => {imageSubmitter.handleAPICall(req, res)});

app.listen(5000, () => {
    console.log('app is running on port 5000');
});