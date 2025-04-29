import { FastifyInstance } from 'fastify';

import { register, login } from '../controllers/auth';

export const authRoutes = (app: FastifyInstance) => {
	app.post('/register', register);
	app.post('/login', login);
};
