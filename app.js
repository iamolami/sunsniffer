require('dotenv').config();
require('express-async-errors');

// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

const express = require('express')
const app = express()

const db = require('./db/connect');
const suggestionsRoutes = require('./routes/suggestionsRoutes')

app.set('trust proxy', 1);
app.use(rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
}));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());


app.get('/api/welcome', (_req, res) => {
    res.status(200).send({message: 'Welcome to Sunsniffer API'});
});

app.use("/api/suggestions", suggestionsRoutes)

const PORT = process.env.PORT || 5000;

const start = async () => {
    try {
        await db.connectDB();
        app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));
    } catch (error) {
        console.log(error);
    }
};

start();

module.exports = app;