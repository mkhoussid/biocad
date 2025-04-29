import { FastifyInstance } from 'fastify';

import { getUsers } from '../controllers/user';

export const userRoutes = (app: FastifyInstance) => {
	app.get('/', getUsers);
};
