import dotenv from 'dotenv';
dotenv.config();
import { Server } from './models/server';

const server = new Server();

export const appName = 'ねこカフェ'

server.listen();
