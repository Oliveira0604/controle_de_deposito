import express, { urlencoded } from 'express';
import { engine } from 'express-handlebars';
import session from 'express-session';
import sessioFileStore from 'session-file-store';
import os from 'os';
import path from 'path';
import 'dotenv/config';
import flash from 'express-flash';
import conn from './db/conn.js';

import User from './models/User.js';
import Product from './models/Products.js';
import Category from './models/Category.js';
import Movement from './models/Movement.js';

const app = express();

const FileStore = sessioFileStore(session);

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json());

app.use(flash());

app.use(express.static('public'));

// Middleware para ver se a pessoa está logada, se sim, passa o id para o locals
app.use((req, res, next) => {
    if (req.session.userid) {
        res.locals.session = req.session;
    }

    next();
})

app.use(session({
    nome: 'session',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
        logFn: function () {},
        path: path.join(os.tmpdir(), 'sessions')
    }),
    cookie: {
        secure: false,
        // 1000ms * 60s * 60m = 1 hora
        maxAge: 1000 * 60 * 60,
        httpOnly: true
    }
}))

async function startApp () {
    try {
        await conn.sync({force: false})
        console.log('Banco conectado com sucesso')
        app.listen(process.env.PORT)
    } catch (error) {
        console.log(`Erro ao conectar ao banco: ${error}`)
    }
}

startApp()