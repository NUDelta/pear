import http from 'http';
import express from 'express';
import settings from './config/settings';
import * as gamesLibrary from '../game/lib/games';
import bodyParser from 'body-parser';
import crypto from 'crypto';
import ws from 'ws';

const app = express();
const port = process.env.PORT || 4000;
app.use(bodyParser.json());

const server = http.createServer(app);
const activeGames = {};

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

server.listen(port, () => {
    console.log('Game server listening on port ' + port);
});

const WebSocketServer = ws.Server;
const wss = new WebSocketServer({ server: server });

app.get('/new/:gameTitle', (req, res) => {
    const gameTitle = req.params.gameTitle || settings.DEFAULT_GAME;
    const ip = (req.headers['x-forwarded-for'] || req.connection.remoteAddress) + Date.now();

    if (gameTitle in gamesLibrary) {
        const newGame = gamesLibrary[gameTitle]();
        const hash = crypto.createHash('md5');
        const gameId = hash.update(ip).digest('hex');
        activeGames[gameId] = newGame;
        res.json({ gameId });
    } else {
        res.status(404).send(`We don't have a game called ${ gameTitle }! Try again.`);
    }
});

app.get('/game/:gameId', (req, res) => {
    const { gameId } = req.params;

    if (gameId in activeGames) {
        connectSocket(gameId);
        const game = activeGames[gameId];
        res.json(game._store.getState());
    } else {
        res.status(404).send(`Oops! Looks like your game ID is invalid. Try again.`);
    }
});

const connectSocket = id => {
    wss.on('connection', (socket) => {
        const stream = new WriteStreamHandler(socket, id);
    });
}
