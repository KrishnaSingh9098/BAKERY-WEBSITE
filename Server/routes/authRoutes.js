import express from 'express';
import { register, login, logOut } from '../controllers/authControllers.js';

const server = express.Router();

server.post('/register', register);
server.post('/login', login);
server.post('/logout', logOut);

export default server;
