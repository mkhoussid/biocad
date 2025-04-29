import { FastifyReply, FastifyRequest } from 'fastify';

import { User } from '../interfaces/User';
import { verifyToken } from '../utils/jwt';

export const getUsers = async (request: FastifyRequest, reply: FastifyReply) => {
	await verifyToken(request);

	const { rows } = await request.server.pg.query<User>('SELECT id, email FROM users');

	reply.send(rows);
};
