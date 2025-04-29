import bcryptjs from 'bcryptjs';
import { FastifyReply, FastifyRequest } from 'fastify';

import { User } from '../interfaces/User';

export const register = async (request: FastifyRequest, reply: FastifyReply) => {
	const { email, password } = request.body as { email: string; password: string };

	const hashedPassword = await bcryptjs.hash(password, 10);

	await request.server.pg.query('INSERT INTO users (email, password) VALUES ($1, $2)', [email, hashedPassword]);

	reply.send({ message: 'User registered successfully' });
};

export const login = async (request: FastifyRequest, reply: FastifyReply) => {
	const { email, password } = request.body as { email: string; password: string };

	const { rows } = await request.server.pg.query<User>('SELECT * FROM users WHERE email = $1', [email]);

	const user = rows[0];
	if (!user) {
		return reply.status(400).send({ message: 'Invalid credentials' });
	}

	const isMatch = await bcryptjs.compare(password, user.password);
	if (!isMatch) {
		return reply.status(400).send({ message: 'Invalid credentials' });
	}

	const token = request.server.jwt.sign({ id: user.id, email: user.email });

	reply.send({ token });
};
