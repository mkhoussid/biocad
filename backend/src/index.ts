import cors from '@fastify/cors';
import jwt from '@fastify/jwt';
import dotenv from 'dotenv';
import Fastify from 'fastify';

import { connectDB } from './services/db';
import { authRoutes } from './routes/auth';
import { userRoutes } from './routes/user';

dotenv.config();

const app = Fastify();

const startServer = async () => {
	await app.register(cors);
	await app.register(jwt, { secret: process.env.JWT_SECRET! });

	await connectDB(app);

	app.register(authRoutes, { prefix: '/api/auth' });
	app.register(userRoutes, { prefix: '/api/users' });

	try {
		await app.listen({ port: 3000, host: '0.0.0.0' });
		console.log('Server running at http://localhost:3000');
	} catch (err) {
		app.log.error(err);
		process.exit(1);
	}
};

startServer();
