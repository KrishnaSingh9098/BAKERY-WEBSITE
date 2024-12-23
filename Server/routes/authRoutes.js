import express from 'express';
import { register, login, logOut, sendVerifyOtp, VerifiedEmail } from '../controllers/authControllers.js';
import userAuth from '../middleware/userAuth.js';

const server = express.Router();

server.post('/register', register);
server.post('/login', login);
server.post('/logout', logOut);
server.post('/send-verify-otp', userAuth,sendVerifyOtp);
server.post('/verify-account', userAuth,VerifiedEmail);

export default server;
