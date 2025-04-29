import { FastifyRequest } from 'fastify';

export const verifyToken = async (request: FastifyRequest) => {
	try {
		await request.jwtVerify();
	} catch (err) {
		throw new Error('Unauthorized');
	}
};
