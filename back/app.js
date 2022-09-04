const express = require('express');
const { sequelize } = require('./models');
const books = require('./routes/books');
const customers = require('./routes/customers');
const rentals = require('./routes/rentals');
const path = require('path');
const jwt = require('jsonwebtoken');
const http = require('http');
const cors = require('cors');
const { Server } = require("socket.io");
const history = require('connect-history-api-fallback');
require('dotenv').config();

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST'],
        credentials: true
    },
    allowEIO3: true
});

var corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}

app.use(express.json());
app.use(cors(corsOptions));

app.use('/api', books);
app.use('/api', customers);
app.use('/api', rentals);
app.use('/api', locations);

app.post('/api_register', (req, res) => {

    const obj = {
        name: req.body.name,
        email: req.body.email,
        admin: req.body.admin,
        password: bcrypt.hashSync(req.body.password, 10)
    };

    Users.create(obj).then( rows => {
        
        const usr = {
            userId: rows.id,
            user: rows.name
        };

        const token = jwt.sign(usr, process.env.ACCESS_TOKEN_SECRET);
        
        res.json({ token: token });

    }).catch( err => res.status(500).json(err) );
});

app.post('/api_login', (req, res) => {

    Users.findOne({ where: { name: req.body.name } })
        .then( usr => {

            if (bcrypt.compareSync(req.body.password, usr.password)) {
                const obj = {
                    userId: usr.id,
                    user: usr.name
                };
        
                const token = jwt.sign(obj, process.env.ACCESS_TOKEN_SECRET);
                
                res.json({ token: token });
            } else {
                res.status(400).json({ msg: "Invalid credentials"});
            }
        })
        .catch( err => res.status(500).json(err) );
});

function getCookies(req) {
    if (req.headers.cookie == null) return {};

    const rawCookies = req.headers.cookie.split('; ');
    const parsedCookies = {};

    rawCookies.forEach( rawCookie => {
        const parsedCookie = rawCookie.split('=');
        parsedCookies[parsedCookie[0]] = parsedCookie[1];
    });

    return parsedCookies;
};

/*function authToken(req, res, next) {
    const cookies = getCookies(req);
    const token = cookies['token'];
  
    if (token == null) return res.redirect(301, '/login');
  
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    
        if (err) return res.redirect(301, '/login');
    
        req.user = user;
    
        next();
    });
}*/


/*app.get('/register', (req, res) => {
    res.sendFile('register.html', { root: './static' });
});

app.get('/login', (req, res) => {
    res.sendFile('login.html', { root: './static' });
});

app.get('/', authToken, (req, res) => {
    res.sendFile('index.html', { root: './static' });
});*/

function authSocket(msg, next) {
    if (msg[1].token == null) {
        next(new Error("Not authenticated"));
    } else {
        jwt.verify(msg[1].token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
            if (err) {
                next(new Error(err));
            } else {
                msg[1].user = user;
                next();
            }
        });
    }
}

io.on('connection', socket => {
    socket.use(authSocket);
 
    socket.on('rental', msg => {
        Rentals.create({ bookId: msg.bookId, customerId: msg.customerId, userId: msg.user.userId })
            .then( rows => {
                Rentals.findOne({ where: { id: rows.id }, include: ['user'] })
                    .then( msg => io.emit('rental', JSON.stringify(msg)) ) 
            }).catch( err => res.status(500).json(err) );
    });

    socket.on('error', err => socket.emit('error', err.message) );
});

const staticMdl = express.static(path.join(__dirname, 'dist'));

app.use(staticMdl);

app.use(history({ index: '/index.html' }));

app.use(staticMdl);

server.listen({ port: process.env.PORT || 8000 }, async () => {
    await sequelize.authenticate();
});